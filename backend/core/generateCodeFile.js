import path from "path";
import fs from "fs";
import { v4 as uid } from "uuid";
import { mkFolder } from "./helpers.js";

const codeFolder = mkFolder("codes");

const generateFile = async (format, code) => {
  const id = uid();
  const codeFileName = `${id}.${format}`;
  const codeFilePath = path.join(codeFolder, codeFileName);
  await fs.writeFileSync(codeFilePath, code);
  return codeFilePath;
};

export default generateFile;
