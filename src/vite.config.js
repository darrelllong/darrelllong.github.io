import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, sep, extname } from "node:path";
import { fileURLToPath } from "node:url";
import fm from "front-matter";

const repoRoot = fileURLToPath(new URL("../", import.meta.url));
const contentFiles = new Set([
  "publications.json",
  "patents.json",
  "pentexoire.json",
  "favicon.ico",
]);
const contentDirs = ["posts", "drafts", "pdfs", "images", "downloads"];
const contentTypes = {
  ".json": "application/json",
  ".md": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".csv": "text/csv; charset=utf-8",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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

        // Drafts join the archive only in the development server. The
        // published manifest and production build continue to use posts/.
        const draftsRoot = resolve(repoRoot, "drafts");
        if (pathname === "posts/index.json" && existsSync(draftsRoot)) {
          try {
            const posts = JSON.parse(readFileSync(resolve(repoRoot, pathname), "utf8"));
            const publishedSlugs = new Set(posts.map((post) => post.slug));
            for (const entry of readdirSync(draftsRoot, { withFileTypes: true })) {
              if (!entry.isFile() || !/^[\w-]+\.md$/.test(entry.name)) continue;
              const slug = entry.name.slice(0, -3);
              if (publishedSlugs.has(slug)) continue;
              const { attributes } = fm(readFileSync(resolve(draftsRoot, entry.name), "utf8"));
              posts.push({ ...attributes, slug });
            }
            response.setHeader("Content-Type", "application/json");
            response.setHeader("Cache-Control", "no-store");
            return response.end(JSON.stringify(posts));
          } catch (error) {
            return next(error);
          }
        }
        const draftRequest = pathname.match(/^posts\/([\w-]+\.md)$/);
        if (draftRequest && !existsSync(resolve(repoRoot, pathname))) {
          pathname = `drafts/${draftRequest[1]}`;
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
