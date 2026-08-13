import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import { primeNotes } from "./lib/episode-notes";

/**
 * `notes` carries the show notes for the episode being rendered — they're kept
 * out of the client bundle, so the prerender pass supplies them here and also
 * inlines them into the page for hydration.
 */
export function render(url: string, notes: Record<string, string> = {}) {
  primeNotes(notes);
  const helmetContext = {} as { helmet?: HelmetServerState };
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext as { helmet: HelmetServerState };
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");
  return { html, head };
}
