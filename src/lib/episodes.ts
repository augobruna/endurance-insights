import episodesData from "@/content/episodes.json";

/**
 * Episodes are generated from the podcast RSS feed by `scripts/fetch-episodes.mjs`,
 * which runs at the start of every build. Edit that script, not the JSON.
 */
export type Episode = {
  slug: string;
  /** Full feed title, e.g. "Topic | Guest Name, credentials…". */
  title: string;
  /** The title's leading segment — what the episode is actually about. */
  topic: string;
  /** Empty for host-only and panel episodes. */
  guest: string;
  date: string;
  description: string;
  /** Sanitised show notes: only p/ul/li/a/strong/em survive the fetch step. */
  notesHtml: string;
  image: string | null;
  audio: string | null;
  spotifyUrl: string | null;
  durationSeconds: number | null;
  /** ISO 8601, e.g. "PT58M41S". */
  duration: string | null;
  season: number | null;
  episode: number | null;
  guid: string;
};

const allEpisodes = episodesData as Episode[];

/** Newest first, matching the blog. */
export const episodes = allEpisodes;

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return allEpisodes.find((e) => e.slug === slug);
}

export function getAdjacentEpisodes(slug: string): {
  prev?: Episode;
  next?: Episode;
} {
  const idx = allEpisodes.findIndex((e) => e.slug === slug);
  if (idx === -1) return {};
  return {
    next: idx > 0 ? allEpisodes[idx - 1] : undefined,
    prev: idx < allEpisodes.length - 1 ? allEpisodes[idx + 1] : undefined,
  };
}

/** "58 min" / "1 h 32 min" — for display next to the date. */
export function formatDuration(seconds: number | null): string | null {
  if (!seconds) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h ? `${h} h ${m} min` : `${m} min`;
}

/** The line under the title: guest first, since that's what people search for. */
export function episodeHeadline(episode: Episode): string {
  return episode.guest ? `${episode.topic} — ${episode.guest}` : episode.topic;
}
