import { cpSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("../../", import.meta.url));
const dist = join(root, "src/dist");
// Only replace generated bundles. Content and legacy URLs remain intact.
rmSync(join(root, "assets"), { recursive: true, force: true });
for (const entry of readdirSync(dist)) {
  cpSync(join(dist, entry), join(root, entry), { recursive: true });
}
console.log(
  "Updated the local GitHub Pages files. Review, commit, and push to publish.",
);
