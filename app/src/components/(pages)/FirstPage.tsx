import React, { useState, useEffect } from "react";

interface SorryComponentProps {
  onComplete: () => void;
}

const SorryComponent: React.FC<SorryComponentProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const correctKeys = "I AM REALLY SORRY".split("");

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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
      </div>
    </div>
  );
};

export default SorryComponent;
