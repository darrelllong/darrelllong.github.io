// Render one page of the site to HTML at build time, for
// scripts/generate-routes.js. The page's data is set before rendering and
// is the same data the page carries for its first render in the browser,
// so that the browser can hydrate the HTML rather than draw it again.
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { StaticApp } from "./App.jsx";
import { setPreloaded } from "./preloaded.js";

export function render(url, data) {
  setPreloaded(data);
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk;
        callback();
      },
    });
    const stream = renderToPipeableStream(<StaticApp url={url} />, {
      // Everything, including the lazily loaded post component, is ready
      onAllReady() {
        sink.on("finish", () => resolve(html));
        stream.pipe(sink);
      },
      onError(error) {
        reject(error);
      },
    });
  });
}
