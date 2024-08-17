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
    event.target.value = "";
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [progress]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
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
                <span className="px-4">_</span>
              )}
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
