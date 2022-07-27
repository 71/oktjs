import { gunzipSync } from "fflate";
import resourcesBinary from "./resources.json.gz";

let files;

export const Resources = Object.freeze({
  get files() {
    if (files === undefined) {
      files = JSON.parse(new TextDecoder().decode(gunzipSync(resourcesBinary)));
    }

    return files;
  },
  read(/** @type string */ filename) {
    return this.files[filename];
  },
});
