import React, { useState, useEffect, useRef } from "react";

interface SorryComponentProps {
  onComplete: () => void;
}

const SorryTyperComponent: React.FC<SorryComponentProps> = ({ onComplete }) => {
  const [userInput, setUserInput] = useState(""); // Accumulate user input
  const correctText = "I AM REALLY SORRY";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    const nextInput = userInput + key;

    if (correctText.startsWith(nextInput)) {
      setUserInput(nextInput);
      if (nextInput === correctText) {
        onComplete();
      }
    } else {
      setUserInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let key = event.target.value.toUpperCase();
    const nextInput = userInput + key;

    if (correctText.startsWith(nextInput)) {
      setUserInput(nextInput);
      if (nextInput === correctText) {
        onComplete();
      }
    } else {
      setUserInput("");
    }
    event.target.value = "";
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [userInput]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTextClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-primary-foreground">
      <div className="space-y-4 text-center" onClick={handleTextClick}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest">
          {correctText.split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block ${
                userInput.length > i
                  ? "text-primary"
                  : "text-muted-foreground opacity-50"
              }`}
            >
              {char !== " " ? char : <span className="px-2"> </span>}
            </span>
          ))}
        </h1>
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          className="absolute opacity-0"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default SorryTyperComponent;
