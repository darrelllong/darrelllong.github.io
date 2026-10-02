// Data rendered into a page at build time, so that the page's HTML holds its
// content before any script runs (scripts/generate-routes.js), and so that
// the client's first render matches that HTML and can hydrate it.
//
// On the server the renderer sets it; in the browser it is read from the
// <script id="preloaded" type="application/json"> that the page carries.
// It holds only what the page shows: a post page its post and the index of
// posts, a publication page the publication and its neighbours, and so on.
// The components fetch the full data afterwards, as they always have.
let preloaded = null;

export function setPreloaded(data) {
  preloaded = data;
}

export function getPreloaded() {
  if (preloaded === null) {
    preloaded = {};
    if (typeof document !== "undefined") {
      const element = document.getElementById("preloaded");
      if (element) {
        try {
          preloaded = JSON.parse(element.textContent);
        } catch {
          preloaded = {};
        }
      }
    }
  }
  return preloaded;
}
