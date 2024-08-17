import React, { useState, useEffect, useRef } from "react";

interface SorryComponentProps {
  onComplete: () => void;
}

const SorryTyperComponent: React.FC<SorryComponentProps> = ({ onComplete }) => {
  const [userInput, setUserInput] = useState("");
  const correctText = "I AM REALLY SORRY";
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let key = event.target.value.toUpperCase();

    if (key.trim() === "") {
      key = " ";
    } else {
    }

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
    <div className="flex border-2 h-max-[200px] sm:h-screen w-full items-center justify-center bg-background text-primary-foreground p-4">
      <div className="space-y-4 text-center" onClick={handleTextClick}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-widest leading-tight sm:leading-none">
          {correctText.split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block ${
                userInput.length > i
                  ? "text-primary"
                  : "text-muted-foreground opacity-50"
              }`}
            >
              {char === " " ? <span className="px-2"> </span> : char}
            </span>
          ))}
        </h1>
      </div>
      <input
        ref={inputRef}
        type="text"
        onChange={handleInputChange}
        className="absolute opacity-0 h-max-[200px] sm:h-screen"
        aria-hidden="true"
        autoComplete="off"
      />
    </div>
  );
};

export default SorryTyperComponent;
