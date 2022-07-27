import { readdir, readFile, writeFile } from "fs/promises";
import { join, relative } from "path";
import { gunzipSync as gunzip, gzipSync as gzip } from "fflate";

const RESOURCES_DIR =
  "./open-korean-text/src/main/resources/org/openkoreantext/processor/util";
const OUTPUT_FILE =
  "./resources.json.gz";
const resources = {};

async function* walk(/** @type string */ path) {
  for (const entry of await readdir(path, { withFileTypes: true })) {
    const entryPath = join(path, entry.name);

    if (entry.isDirectory()) {
      yield* walk(entryPath);
    } else if (entry.isFile()) {
      yield entryPath;
    }
  }
}

for await (const path of walk(RESOURCES_DIR, { includeDirs: false })) {
  const resourcePath = relative(RESOURCES_DIR, path).replace("\\", "/");
  /** @type {string} */
  let contents;

  if (path.endsWith(".gz")) {
    const compressedContents = await readFile(path),
          uncompressedContents = gunzip(compressedContents);

    contents = new TextDecoder().decode(uncompressedContents);
  } else {
    contents = await readFile(path, { encoding: "utf-8" });
  }

  resources[resourcePath] = contents;
}

await writeFile(OUTPUT_FILE, gzip(new TextEncoder().encode(JSON.stringify(resources))));
