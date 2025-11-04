import { copyFileSync } from "fs";
import { resolve } from "path";

const filesToCopy = ["manifest.json", "icon.png"];

filesToCopy.forEach((file) => {
  copyFileSync(resolve(file), resolve("dist", file));
  console.log(`Copied ${file} -> dist/`);
});
