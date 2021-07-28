import dotenv from "dotenv";
import app from "./server.js";
import generateFile from "./generateCodeFile.js";
import executeCpp from "./exCodeCpp.js";

dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  console.log("req: ");

  return res.json({ hello: "people" });
});

app.post("/compile", async (req, res) => {
  const { lang = "cpp", code } = req.body;
  if (!code) {
    res.status(400).json({ error: "no code!" });
  }
  let formats = { cpp: "cpp", python: "py", javascript: "js" };
  let format = formats[lang];
  const codeFile = await generateFile(format, code);
  const output = await executeCpp(codeFile);
  console.log(output);
  return res.json({ output });
});

app.get("*", (req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => {
  console.log("listening to port:", port);
});
