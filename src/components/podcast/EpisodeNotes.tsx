import { useEffect, useState } from "react";
import { getNotes, fetchNotes } from "@/lib/episode-notes";

/**
 * Render this with `key={slug}` so navigating between episodes remounts it and
 * the notes state can't go stale.
 */
const EpisodeNotes = ({ slug }: { slug: string }) => {
  // On a prerendered page this is populated synchronously, so the server and
  // client render identical markup and hydration is clean.
  const [html, setHtml] = useState<string | undefined>(() => getNotes(slug));

  useEffect(() => {
    if (html !== undefined) return;
    let cancelled = false;
    fetchNotes(slug)
      .then((notes) => !cancelled && setHtml(notes))
      .catch(() => !cancelled && setHtml(""));
    return () => {
      cancelled = true;
    };
  }, [slug, html]);

  if (html === undefined) {
    return (
      <p className="text-muted-foreground" role="status">
        Loading episode notes…
      </p>
    );
  }

  return (
    // Notes come from our own RSS feed and are reduced at build time to
    // p/ul/li/a/strong/em by scripts/fetch-episodes.mjs.
    <div
      className="prose prose-invert prose-lg max-w-none prose-headings:font-[Roca_One] prose-a:text-primary hover:prose-a:underline prose-strong:text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default EpisodeNotes;
