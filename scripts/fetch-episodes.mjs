#!/usr/bin/env node
/**
 * Pulls the podcast RSS feed and writes `src/content/episodes.json`, which is
 * what the /podcast pages, the sitemap, and the prerender pass all read.
 *
 * The generated file is committed. If the feed is unreachable at build time we
 * keep the committed copy rather than failing the deploy — a stale episode list
 * beats a broken site.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outFile = join(root, "src/content/episodes.json");
const notesFile = join(root, "src/content/episode-notes.json");
const notesDir = join(root, "public/episodes");
const artDir = join(root, "public/podcast");

const FEED_URL = "https://anchor.fm/s/fd7296f8/podcast/rss";
const FETCH_TIMEOUT_MS = 20000;
const ARTWORK_SIZE = 400;

// ---------------------------------------------------------------- xml helpers

const tag = (xml, name) => {
  const m = xml.match(
    new RegExp(`<${name}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`)
  );
  return m ? m[1].trim() : "";
};

const attr = (xml, name, key) => {
  const m = xml.match(new RegExp(`<${name}[^>]*\\s${key}="([^"]*)"`));
  return m ? m[1] : "";
};

// ------------------------------------------------------------ show-note clean

/** Tags we keep in show notes. Everything else is unwrapped to its text. */
const KEEP = new Set(["P", "BR", "A", "UL", "OL", "LI", "STRONG", "EM", "B", "I"]);

/**
 * "Follow Bruna / Follow Fabi / check out augo" lines repeat almost verbatim on
 * most episodes, and not always at the end. Rendering them 42 times would make
 * the pages look largely identical to a search engine, and the site already
 * says all of this in its own furniture.
 *
 * Matches only self-references — "Follow Pascal", "Find Ash at…" and photo
 * credits are unique per episode and stay.
 */
const HOST_BOILERPLATE = new RegExp(
  [
    "^follow\\s+(fabi|bruna|augo)\\b",
    "^follow\\s+(us|the podcast)\\b",
    "^(bruna|fabi)\\s*(&|and)\\s*(bruna|fabi)\\b",
    "^learn more about (augo|the podcast|human endurance)",
    "^more about human endurance",
    "^to support this podcast",
    "^train with bruna",
    "^use code\\b",
    "^subscribe to our newsletter",
  ].join("|"),
  "i"
);

const SEPARATOR = /^[-–—_*\s]{2,}$/;

function cleanNotes(html) {
  const doc = new JSDOM(`<body>${html}</body>`).window.document;
  const body = doc.body;

  body.querySelectorAll("*").forEach((el) => {
    if (KEEP.has(el.tagName)) {
      if (el.tagName === "A") {
        const href = el.getAttribute("href") || "";
        // Anchor sometimes emits bare domains; make them real links.
        const safe = /^https?:\/\//i.test(href)
          ? href
          : /^www\./i.test(href)
          ? `https://${href}`
          : null;
        [...el.attributes].forEach((a) => el.removeAttribute(a.name));
        if (safe) {
          el.setAttribute("href", safe);
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        } else {
          el.replaceWith(...el.childNodes);
          return;
        }
      } else {
        [...el.attributes].forEach((a) => el.removeAttribute(a.name));
      }
      return;
    }
    el.replaceWith(...el.childNodes);
  });

  // Remove the repeated host/promo lines wherever they appear — some episodes
  // put them mid-notes above a chapter list, others as <li> inside a link list.
  body.querySelectorAll("p, li").forEach((el) => {
    const text = el.textContent.replace(/[⁠​]/g, "").trim();
    if (HOST_BOILERPLATE.test(text)) el.remove();
  });
  body.querySelectorAll("ul, ol").forEach((list) => {
    if (!list.querySelector("li")) list.remove();
  });

  // Then drop empty blocks and any separator left stranded at the edges.
  const isDroppable = (el) => {
    const text = el.textContent.replace(/[⁠​]/g, "").trim();
    return !text || SEPARATOR.test(text);
  };
  body.querySelectorAll("p, li").forEach((el) => {
    if (isDroppable(el) && !el.querySelector("a")) el.remove();
  });
  while (body.lastElementChild && isDroppable(body.lastElementChild)) {
    body.lastElementChild.remove();
  }
  while (body.firstElementChild && isDroppable(body.firstElementChild)) {
    body.firstElementChild.remove();
  }

  return body.innerHTML.replace(/\s+/g, " ").replace(/> </g, "><").trim();
}

const textOf = (html) => {
  const doc = new JSDOM(`<body>${html}</body>`).window.document;
  // Separate block elements, or the last word of one paragraph welds onto the
  // first word of the next.
  doc.querySelectorAll("p,li,br,ul,ol").forEach((el) => {
    el.insertAdjacentText("beforebegin", " ");
    el.insertAdjacentText("afterend", " ");
  });
  return doc.body.textContent.replace(/\s+/g, " ").trim();
};

// ------------------------------------------------------------------ slug/meta

const kebab = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const TRAILING_STOPWORD =
  /-(?:the|a|an|s|to|of|for|in|on|at|as|and|or|with|from|by|his|her|their|is|was|how|what|why|professional|pro|coach|founder|host)$/;

/** Trim to a word boundary, and never end on a stopword. */
function shorten(slug, max = 62) {
  let out = slug;
  if (out.length > max) {
    const cut = out.slice(0, max);
    const at = cut.lastIndexOf("-");
    out = at > 20 ? cut.slice(0, at) : cut;
  }
  out = out.replace(/-+$/, "");
  while (TRAILING_STOPWORD.test(out)) out = out.replace(TRAILING_STOPWORD, "");
  return out;
}

const SERIES_SEGMENT = /^(expert series|guest series|episode|epis[oó]dio|part\s*\d)/i;

/** Words that start a role or credential, never a person's name. */
const NOT_A_NAME =
  /^(professional|pro|founder|co-founder|host|co-host|coach|triathlon|triathlete|runner|ultra|expert|guest|episode|part|world|olympic|ironman|medical|elite|coaching|coached|from|with|coache?s?|sports?|coach's)\b/i;

/** Feed titles carry a few misspellings; guest names are too important to ship wrong. */
const GUEST_OVERRIDES = {
  "samulel-studer": "Samuel Studer",
  "ronja-hofsetter": "Ronja Hofstetter",
  "paul-robbinson": "Paul Robinson",
  "reto-brandli": "Reto Brändli",
};

/** Episodes whose guest the heuristic can't reach from the title alone. */
const GUEST_BY_SLUG_HINT = {
  "marginal-gains": "Mikael Eriksson",
  "25-year-old-ultra-running-phenom": "Hans Troyer",
  "the-journey-of-pro-triathlete-leana-bissig": "Leana Bissig",
  "leveraging-ai-in-endurance-sports": "Markus Rummel",
  "how-anyone-can-become-a-great-swimmer": "Fares Ksebati",
  "racing-in-endurance-bike-packing-events": "Julia Skrolewski",
  "the-power-of-cross-training": "",
  "navigating-first-marathons": "",
};

/** Pull the leading run of capitalised words, e.g. "Markus Rummel founder of…". */
function leadingName(text) {
  const m = text.match(
    /^([A-ZÀ-Ý][\p{L}'’.-]*(?:\s+[A-ZÀ-Ý][\p{L}'’.-]*){1,3})/u
  );
  if (!m) return "";
  const name = m[1].trim();
  if (NOT_A_NAME.test(name)) return "";
  if (name.split(/\s+/).length < 2) return "";
  return name;
}

/**
 * Titles are formatted "Topic | Series NN | Guest Name, credentials…", though
 * older ones use ":" or "with <name>" instead. The guest is the last segment
 * that reads like a person.
 */
function parseTitle(raw) {
  const title = raw.replace(/\s+/g, " ").trim();
  const parts = title.split("|").map((p) => p.trim()).filter(Boolean);
  const topic = parts[0] || title;

  let guest = "";
  for (let i = parts.length - 1; i >= 1 && !guest; i--) {
    if (SERIES_SEGMENT.test(parts[i])) continue;
    guest = leadingName(parts[i].split(",")[0].trim());
  }
  // Fall back to "… with Mikael Eriksson" or "Phenom: Hans Troyer" in segment one.
  if (!guest) {
    const withMatch = topic.match(/\bwith\s+(.+)$/i);
    if (withMatch) guest = leadingName(withMatch[1].split(",")[0].trim());
  }
  if (!guest && topic.includes(":")) {
    guest = leadingName(topic.split(":").pop().split(",")[0].trim());
  }

  const key = kebab(guest);
  if (GUEST_OVERRIDES[key]) guest = GUEST_OVERRIDES[key];

  return { title, topic, guest };
}

function durationSeconds(raw) {
  if (!raw) return null;
  const parts = raw.split(":").map(Number);
  if (parts.some(Number.isNaN)) return null;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

/** ISO 8601 duration, which is what schema.org expects. */
function isoDuration(seconds) {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}` || "PT0S";
}

// ---------------------------------------------------------------------- parse

function parseFeed(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  const seen = new Map();

  return items.map((item) => {
    const parsed = parseTitle(tag(item, "title"));
    const { title, topic } = parsed;
    const notes = cleanNotes(tag(item, "description"));
    const plain = textOf(notes);
    const seconds = durationSeconds(tag(item, "itunes:duration"));

    const topicSlug = shorten(kebab(topic)) || kebab(title).slice(0, 62);

    // A few titles hide the guest somewhere the heuristic can't reach.
    let guest = parsed.guest;
    for (const [hint, name] of Object.entries(GUEST_BY_SLUG_HINT)) {
      if (topicSlug.startsWith(hint)) {
        guest = name;
        break;
      }
    }

    // Guest names are the queries most likely to find these pages, so put the
    // name in the URL unless the topic already carries their surname.
    const guestSlug = kebab(guest);
    const nameWords = new Set(guestSlug.split("-").filter((w) => w.length > 1));
    const hasSurname =
      guestSlug && topicSlug.includes(kebab(guest.split(" ").pop()));

    let slugBase = topicSlug;
    if (guestSlug && !hasSurname) {
      // Drop any first-name mention from the topic so it isn't repeated.
      const trimmedTopic = topicSlug
        .split("-")
        // Drop the name words themselves, plus the orphan "s" left by a
        // possessive like "Roberto's". Digits stay — "7 continents" needs them.
        .filter((w) => w !== "s" && !nameWords.has(w))
        .join("-");
      slugBase = `${shorten(trimmedTopic, 44)}-${guestSlug}`;
    }

    let slug = shorten(slugBase, 72);
    if (seen.has(slug)) {
      const n = seen.get(slug) + 1;
      seen.set(slug, n);
      slug = `${slug}-${n}`;
    } else {
      seen.set(slug, 1);
    }

    return {
      slug,
      title,
      topic,
      guest,
      date: new Date(tag(item, "pubDate")).toISOString().slice(0, 10),
      description: plain.length > 300 ? `${plain.slice(0, 297).trimEnd()}…` : plain,
      notesHtml: notes,
      // `image` is rewritten to the local copy by downloadArtwork(); the
      // original is kept so a failed download can still fall back to the CDN.
      remoteImage: attr(item, "itunes:image", "href") || null,
      image: attr(item, "itunes:image", "href") || null,
      audio: attr(item, "enclosure", "url") || null,
      spotifyUrl: tag(item, "link") || null,
      durationSeconds: seconds,
      duration: isoDuration(seconds),
      season: Number(tag(item, "itunes:season")) || null,
      episode: Number(tag(item, "itunes:episode")) || null,
      guid: tag(item, "guid"),
    };
  });
}

// ----------------------------------------------------------------------- main

async function loadFeed() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(FEED_URL, {
      signal: controller.signal,
      headers: { "user-agent": "humanendurancepodcast.com build" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

let episodes;
try {
  episodes = parseFeed(await loadFeed());
  if (!episodes.length) throw new Error("feed parsed to zero episodes");
} catch (err) {
  if (existsSync(outFile)) {
    const cached = JSON.parse(readFileSync(outFile, "utf8"));
    console.warn(
      `fetch-episodes: ${err.message} — keeping ${cached.length} cached episodes`
    );
    process.exit(0);
  }
  console.error(`fetch-episodes: ${err.message} and no cached copy exists`);
  process.exit(1);
}

episodes.sort((a, b) => b.date.localeCompare(a.date));

/**
 * Episode artwork on the feed CDN averages ~690 KB each and is displayed at
 * 200px, so linking it directly put ~28 MB on /podcast. Re-host a 400px copy.
 * Existing files are left alone, so only new episodes cost a download.
 */
async function downloadArtwork(list) {
  mkdirSync(artDir, { recursive: true });
  let fetched = 0;
  let failed = 0;

  for (const ep of list) {
    const dest = join(artDir, `${ep.slug}.jpg`);
    if (existsSync(dest)) {
      ep.image = `/podcast/${ep.slug}.jpg`;
      continue;
    }
    if (!ep.remoteImage) {
      ep.image = null;
      continue;
    }
    try {
      const res = await fetch(ep.remoteImage, {
        headers: { "user-agent": "humanendurancepodcast.com build" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize(ARTWORK_SIZE, ARTWORK_SIZE, { fit: "cover" })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(dest);
      ep.image = `/podcast/${ep.slug}.jpg`;
      fetched++;
    } catch (err) {
      // Fall back to the CDN URL for this one episode rather than failing.
      console.warn(`  artwork ${ep.slug}: ${err.message} — using remote URL`);
      failed++;
    }
  }
  return { fetched, failed };
}

const art = await downloadArtwork(episodes);

// Show notes are ~60 KB of the episode data and are only ever needed on the
// one episode page being viewed, so they ship as separate files rather than
// riding along in every page's JS bundle.
mkdirSync(notesDir, { recursive: true });
for (const ep of episodes) {
  writeFileSync(
    join(notesDir, `${ep.slug}.json`),
    JSON.stringify({ slug: ep.slug, notesHtml: ep.notesHtml })
  );
}

const metadata = episodes.map(({ notesHtml, ...rest }) => rest);
writeFileSync(outFile, `${JSON.stringify(metadata, null, 2)}\n`);
writeFileSync(notesFile, `${JSON.stringify(
  Object.fromEntries(episodes.map((e) => [e.slug, e.notesHtml])),
  null,
  2
)}\n`);

console.log(
  `Wrote ${episodes.length} episodes to src/content/episodes.json ` +
    `(${art.fetched} artwork downloaded, ${art.failed} fell back to remote)`
);
