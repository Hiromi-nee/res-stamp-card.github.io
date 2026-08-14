import { mkdir, writeFile, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const workerPath = resolve(projectRoot, "worker/index.js");
const outDir = resolve(projectRoot, "pages-dist");
const outPath = resolve(outDir, "index.html");
const noJekyllPath = resolve(outDir, ".nojekyll");

const source = await readFile(workerPath, "utf8");
const match = source.match(/const page = String\.raw`([\s\S]*?)`;\n\nexport default/s);

if (!match) {
  throw new Error("Could not find inline HTML page in worker/index.js");
}

await mkdir(outDir, { recursive: true });
await Promise.all([
  writeFile(outPath, match[1], "utf8"),
  writeFile(noJekyllPath, "", "utf8"),
]);

console.log(`Built ${outPath}`);
