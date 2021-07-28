import { useState } from "react";
import axios from "axios";
import "./App.css";

const initialCode = `#include <iostream>

int main(){
  std::cout << "Hello World!" << std::endl;
  return 0;
}`;
const initialLang = "cpp";
const rustCode = `fn main() {
    println!("Hello, world!");
}`;

function App() {
  const [code, setcode] = useState(initialCode);
  const [lang, setlang] = useState(initialLang);
  const [output, setoutput] = useState("");

  const payload = {
    lang,
    code,
  };

  const url = process.env.REACT_APP_URL;

  const submitHndel = async () => {
    try {
      const { data } = await axios.post(url, payload);
      console.log(data);
      setoutput(data);
    } catch (error) {
      // if (response) {
      //   const errMsg = response.data.err.stderr;
      //   setoutput(errMsg);
      // } else {
      //   setoutput("Please retry submitting.");
      // }
      console.log(error);
    }
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
          <option value="python">Python</option>
          <option value="rust">Rust</option>
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
