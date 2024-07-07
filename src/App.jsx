import { useState } from "react";
import "./index.css";
import usePasswordGenerator from "./Hooks/use-password-generator";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updateCheckboxData = [...checkboxData];
    updateCheckboxData[i].state = !updateCheckboxData[i].state;
    setCheckboxData(updateCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* {Error Handling} */}
      {errorMessage && <div className="errormessage">{errorMessage}</div>}

      {/* {password display & copy} */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "copied" : "copy"}
          </button>
        </div>
      )}

      {/* {character length} */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* {Check Box} */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>

      {/* {Generate Button} */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}
