/**
 * Show notes are deliberately kept out of the client bundle — across 42
 * episodes they are ~60 KB, and any given page needs exactly one of them.
 *
 * Three ways they arrive, in order:
 *  1. Prerender: `scripts/prerender.mjs` primes this module before rendering.
 *  2. First paint in the browser: the same HTML is inlined as
 *     `window.__EPISODE_NOTES__`, so hydration matches the prerendered markup.
 *  3. Client-side navigation to a different episode: fetched on demand from
 *     `/episodes/<slug>.json` (~1.4 KB).
 */

type NoteMap = Record<string, string>;

declare global {
  interface Window {
    __EPISODE_NOTES__?: NoteMap;
  }
}

let primed: NoteMap = {};

/** Called by the prerender pass before renderToString. */
export function primeNotes(notes: NoteMap): void {
  primed = notes;
}

/** Synchronous lookup — returns undefined when the notes must be fetched. */
export function getNotes(slug: string): string | undefined {
  if (primed[slug] !== undefined) return primed[slug];
  if (typeof window !== "undefined") return window.__EPISODE_NOTES__?.[slug];
  return undefined;
}

export async function fetchNotes(slug: string): Promise<string> {
  const res = await fetch(`/episodes/${slug}.json`);
  if (!res.ok) throw new Error(`notes for ${slug}: HTTP ${res.status}`);
  const data = (await res.json()) as { notesHtml?: string };
  return data.notesHtml ?? "";
}
