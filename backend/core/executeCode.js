import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { mkFolder } from "./helpers.js";

const outputFolder = mkFolder("output");

let excution;
let outputFilePath;
const executeCode = (filePath, lang) => {
  const fileId = path.basename(filePath).split(".")[0];
  if (lang === "cpp") {
    outputFilePath = path.join(outputFolder, `${fileId}.out`);
    excution = `g++ ${filePath} -o ${outputFilePath} && cd ${outputFolder} && ./${fileId}.out `;
    console.log("outputFilePath: ", outputFilePath);
  } else if (lang === "rust") {
    outputFilePath = path.join(outputFolder, `${fileId}.out`);
    excution = `rustc ${filePath} -o ${outputFilePath} && cd ${outputFolder} && ./${fileId}.out `;
  } else {
    excution = `python3 ${filePath} `;
  }

  return new Promise((resolve, reject) => {
    exec(excution, (error, stdout, stderr) => {
      try {
        if (!stderr) {
          resolve(`${stdout}`);
        } else {
          resolve(`${stderr}`);
        }
      } catch (e) {
        resolve(`${error.message}`);
      }
    });
  });
};

export default executeCode;
