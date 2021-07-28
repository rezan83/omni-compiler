import fs from "fs";

const mkFolder = (folderName) => {
  const folderPath = new URL(folderName, import.meta.url).pathname;

  // const folderPath = path.join( __dirname, folderName );

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
};

export { mkFolder };
