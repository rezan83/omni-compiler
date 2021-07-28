import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setcode] = useState(`#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}`);
  const [lang, setlang] = useState("cpp");
  const [output, setoutput] = useState("");

  const payload = {
    lang,
    code,
  };

  const url = process.env.REACT_APP_URL;

  const submitHndel = async () => {
    const { data } = await axios.post(url, payload);
    console.log(data);
    setoutput(data);
  };
  return (
    <div className="App">
      <header className="App-header flex-column">
        <h1>OmniCompiler</h1>
      </header>
      <main className="flex-column">
        <select
          name=""
          value={lang}
          id=""
          onChange={(e) => setlang(e.target.value)}
        >
          <option value="cpp">Cpp</option>
          <option value="python">python</option>
          <option value="js">Javascript</option>
        </select>
        <textarea
          value={code}
          onChange={(e) => setcode(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="5"
        ></textarea>

        <button
          onClick={() => {
            submitHndel();
            setcode("");
          }}
        >
          Compile
        </button>

        <textarea
          value={output.output}
          name=""
          id=""
          cols="30"
          rows="5"
        ></textarea>
      </main>
    </div>
  );
}

export default App;
