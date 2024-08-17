import React, { useState, useEffect, useRef } from "react";

interface SorryComponentProps {
  onComplete: () => void;
}

const SorryTyperComponent: React.FC<SorryComponentProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const correctKeys = "I AM REALLY SORRY".split("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    if (key === correctKeys[progress]) {
      setProgress(progress + 1);
      if (progress === correctKeys.length - 1) {
        onComplete();
      }
    } else {
      setProgress(0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toUpperCase();
    if (key === correctKeys[progress]) {
      setProgress(progress + 1);
      if (progress === correctKeys.length - 1) {
        onComplete();
      }
    } else {
      setProgress(0);
    }
    event.target.value = ""; // Clear the input after checking
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [progress]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Ensure the input is focused for mobile users
    }
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-primary-foreground">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest">
          {[...Array(correctKeys.length)].map((_, i) => (
            <span
              key={i}
              className={`inline-block ${
                progress > i
                  ? "text-primary"
                  : "text-muted-foreground opacity-50"
              }`}
            >
              {correctKeys[i] !== " " ? (
                correctKeys[i]
              ) : (
                <span className="px-4">{correctKeys[i]}</span>
              )}
            </span>
          ))}
        </h1>
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          className="opacity-0 absolute" // Hidden but still focusable for mobile input
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default SorryTyperComponent;
