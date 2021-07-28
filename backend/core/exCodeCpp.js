import {exec} from "child_process";
import path from "path";
import fs from "fs";
import { mkFolder } from "./helpers.js";

const outputFolder = mkFolder("output");

const executeCpp = (filePath) => {
  const fileId = path.basename(filePath).split(".")[0];
  const outputFilePath = path.join(outputFolder, `${fileId}.out`);

console.log("outputFilePath: ", outputFilePath);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputFilePath} && cd ${outputFolder} && ./${fileId}.out `,
      (error, stdout, stderr) => {
        if (error) {
          reject(`error: ${error.message}`);
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
        }
        resolve(`${stdout}`);
      }
    );

  })
  
};

export default executeCpp
