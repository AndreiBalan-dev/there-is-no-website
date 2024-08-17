import React, { useState, useEffect, useRef } from "react";

interface SorryComponentProps {
  onComplete: () => void;
}

const SorryTyperComponent: React.FC<SorryComponentProps> = ({ onComplete }) => {
  const [userInput, setUserInput] = useState("");
  const correctText = "I AM REALLY SORRY";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    console.log(key, "KEY PRESS");
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

    if (key.trim() === "") {
      console.log("SPACE", "INPUT CHANGE");
    } else {
      console.log(key, "INPUT CHANGE");
    }

    const nextInput = userInput + key;

    if (correctText.startsWith(nextInput)) {
      setUserInput(nextInput);
      if (nextInput === correctText) {
        onComplete();
      }
    } else {
      setUserInput(""); // Reset if input doesn't match
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
              {char}
            </span>
          ))}
        </h1>
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          className="absolute opacity-0"
          aria-hidden="true"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default SorryTyperComponent;
