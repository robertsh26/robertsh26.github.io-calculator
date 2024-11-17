import React, { useState } from "react";
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isNewInput, setIsNewInput] = useState(false);

  const handleClick = (value) => {
    if (value === "C") {
      setDisplayValue('0');
      setPrevValue(null);
      setOperator(null);
      setIsNewInput(false);
    } else if (!isNaN(value) || value === ".") {
      setDisplayValue((prev) =>
        isNewInput ? value : prev === '0' ? value : prev + value
      );
      setIsNewInput(false);
    } else if (value === "DEL") {
      setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (value === "%") {
      setDisplayValue((prev) => {
        const current = parseFloat(prev);
        if (prevValue !== null && operator) {
          const percentageValue = (parseFloat(prevValue) * current) / 100;
          return String(percentageValue);
        } else {
          return String(current / 100);
        }
      });
      setIsNewInput(true);
    } else if (["+", "-", "*", "/"].includes(value)) {
      console.log("Operator selected:", value);
      setOperator(value);
      setPrevValue(displayValue);
      setIsNewInput(true);
    } else if (value === "=") {
      console.log("Equals logic triggered with:", { operator, prevValue, displayValue });
      if (operator && prevValue) {
        const current = parseFloat(displayValue);
        const previous = parseFloat(prevValue);
        let result = 0;

        switch (operator) {
          case "+":
            result = previous + current;
            break;
          case "-":
            result = previous - current;
            break;
          case "*":
            result = previous * current;
            break;
          case "/":
            result = current !== 0 ? previous / current : "Error";
            break;
          default:
            break;
        }

        setDisplayValue(String(result));
        setPrevValue(null);
        setOperator(null);
        setIsNewInput(true);
      } else {
        console.log("Equals logic not executed: Missing operator or previous value");
      }
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    // Validate and process typed input
    if (/^[0-9+*/%.-]*$/.test(value)) {
      if (isNewInput) {
        setDisplayValue(value); // Start fresh if new input
        setIsNewInput(false);
      } else {
        setDisplayValue(value); // Update the input normally
      }
    }
  };

  const handleKeyDown = (event) => {
    console.log("Key Pressed:", event.key);
  
    // Prevent default behavior for handled keys
    if (!isNaN(event.key) || ["+", "-", "*", "/", ".", "Enter", "Backspace", "Escape"].includes(event.key)) {
      event.preventDefault(); // Prevent input field's default behavior
    }
  
    if (!isNaN(event.key) || event.key === ".") {
      // Handle number input
      handleClick(event.key);
    } else if (["+", "-", "*", "/"].includes(event.key)) {
      // Handle operator input
      handleClick(event.key);
    } else if (event.key === "Enter") {
      console.log("Triggering equals from Enter key");
      handleClick("=");
    } else if (event.key === "Backspace") {
      // Handle backspace
      handleClick("DEL");
    } else if (event.key === "Escape") {
      // Handle clear
      handleClick("C");
    }
  };

  return (
    <div className="calculator">
      <header className="header">
        <h1>Welcome to the Calculator App</h1>
      </header>
      <div className="buttons">
        <div className="row">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("%")}>%</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("C")}>C</button>
          <button onClick={() => handleClick("DEL")}>DEL</button>
          <button onClick={() => handleClick("=")}>=</button>
        </div>
        
        <input 
          className="display"
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default App;
