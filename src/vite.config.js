import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const contentFiles = new Set([
  "publications.json",
  "patents.json",
  "pentexoire.json",
  "favicon.ico",
]);
const contentDirs = ["posts", "pdfs", "images"];
const contentTypes = {
  ".json": "application/json",
  ".md": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

// Runtime content lives beside the deployed site, outside Vite's source root.
function runtimeContent() {
  return {
    name: "runtime-content",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        let pathname;
        try {
          pathname = decodeURIComponent(
            new URL(request.url, "http://localhost").pathname,
          ).slice(1);
        } catch {
          return next();
        }
        const file = resolve(repoRoot, pathname);
        const allowed =
          contentFiles.has(pathname) ||
          contentDirs.some((directory) =>
            file.startsWith(resolve(repoRoot, directory) + sep),
          );
        if (!allowed || !existsSync(file) || !statSync(file).isFile())
          return next();
        response.setHeader(
          "Content-Type",
          contentTypes[extname(file)] || "application/octet-stream",
        );
        createReadStream(file).on("error", next).pipe(response);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), runtimeContent()],
  base: "/",
});
