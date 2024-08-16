import React, { useState, useEffect, useRef } from "react";

const CookieClickerComponent = () => {
  const [clicks, setClicks] = useState(0);
  const [cps, setCps] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const clickTimes = useRef<number[]>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (isVictory) { return };
        const currentTime = Date.now();

        clickTimes.current = clickTimes.current.filter(
          (time) => currentTime - time <= 1000
        );

        setCps(clickTimes.current.length);

        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            if (cps >= 8) {
              setIsVictory(true);
            } else {
              resetGame();
            }
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, cps]);

  const handleClick = () => {
    if (!isRunning) {
      startGame();
    }

    setClicks((prev) => prev + 1);
    const currentTime = Date.now();

    clickTimes.current.push(currentTime);
  };

  const startGame = () => {
    setIsRunning(true);
    setTimeLeft(5);
    clickTimes.current = [];
  };

  const resetGame = () => {
    setIsRunning(false);
    setClicks(0);
    setCps(0);
    setIsVictory(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isVictory ? (
        <div className="bg-card p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-card-foreground mb-4">Eh!</h1>
          <p className="text-lg text-muted-foreground">
            You sure did maintain a CPS of {cps}. Fine, proceed!
          </p>
        </div>
      ) : (
        <>
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <button className="text-9xl font-bold" onClick={handleClick} disabled={isVictory}>
                🍪
              </button>
              <div className="text-3xl font-bold text-card-foreground mt-4">{clicks} clicks</div>
              <div className="text-lg text-muted-foreground mt-2">{cps.toFixed(2)} CPS</div>
            </div>
          </div>
          <div className="text-muted-foreground text-center text-sm mt-4">
            {isRunning ? `Time left: ${timeLeft}s` : "Can you keep up with the pace of 8 clicks per second, annoying brat?"}
          </div>
        </>
      )}
    </div>
  );
};

export default CookieClickerComponent;
