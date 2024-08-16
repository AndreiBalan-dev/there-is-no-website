import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button"
import { motion } from "framer-motion";
import useSound from "use-sound";
// @ts-ignore
import swordSound from "../../assets/sword-slash.mp3";
// @ts-ignore
import sword from "../../assets/sword.png";
// @ts-ignore
import bombPotion from "../../assets/bomb.png"

type Bomb = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

const SwordMiniGameComponent = () => {
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [bombCount, setBombCount] = useState(0);
  const [slicedCount, setSlicedCount] = useState(0);
  const swordRef = useRef<HTMLDivElement>(null);
  const [playSwordSound] = useSound(swordSound);

  useEffect(() => {
    playSwordSound();
  }, []);

  useEffect(() => {
    const generateBomb = () => {
      if (bombCount < 15) {
        const id = Math.random();
        const x = (Math.floor(Math.random() * (window.innerWidth - 10))) + 10;
        const speed = 10 + Math.random() * 3;
        setBombs((prevBombs) => [...prevBombs, { id, x, y: 0, speed }]);
        setBombCount((prevCount) => prevCount + 1);
      }
    };

    if (!gameOver) {
      const bombInterval = setInterval(generateBomb, 1000);
      return () => clearInterval(bombInterval);
    }
  }, [gameOver, bombCount]);

  useEffect(() => {
    const moveBombs = () => {
      setBombs((prevBombs) =>
        prevBombs.map((bomb) => ({
          ...bomb,
          y: bomb.y + bomb.speed,
        }))
      );
    };

    if (!gameOver) {
      const moveInterval = setInterval(moveBombs, 16);
      return () => clearInterval(moveInterval);
    }
  }, [gameOver]);

  useEffect(() => {
    const checkBombs = () => {
      bombs.forEach((bomb) => {
        if (bomb.y > window.innerHeight) {
          resetGame();
        }
      });
    };

    if (bombs.length > 0 && !gameOver) {
      const checkInterval = setInterval(checkBombs, 16);
      return () => clearInterval(checkInterval);
    }
  }, [bombs, gameOver]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (swordRef.current) {
      swordRef.current.style.left = `${event.clientX}px`;
      swordRef.current.style.top = `${event.clientY}px`;
    }
  };

  const handleSlice = (bombId: number) => {
    setBombs((prevBombs) => prevBombs.filter((bomb) => bomb.id !== bombId));
    setSlicedCount((prevCount) => prevCount + 1);
    playSwordSound();
    if (slicedCount + 1 >= 15) {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setBombCount(0);
    setSlicedCount(0);
    setBombs([]);
  };

  return (
    <div onMouseMove={handleMouseMove} className="w-screen h-screen overflow-hidden relative cursor-none">
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1>Game Over</h1>
        </div>
      )}

      <div ref={swordRef} className="absolute w-14 h-14 bg-center bg-no-repeat bg-cover pointer-events-none transform -scale-x-100"
        style={{
          backgroundImage: `url(${sword})`,
        }}
      />

      {bombs.map((bomb) => (
        <motion.div
          key={bomb.id}
          animate={{ y: bomb.y }}
          transition={{ ease: "linear", duration: 0.016 }}
          onMouseEnter={() => handleSlice(bomb.id)}
          className="absolute top-0 w-24 h-24 bg-center bg-no-repeat bg-cover"
          style={{
            left: bomb.x,
            backgroundImage: `url('${bombPotion}')`,
          }}
        />
      ))}

      <div className="flex items-center justify-center h-full text-8xl text-foreground/20 font-bold pointer-events-none">
        x{slicedCount}
      </div>
    </div>
  );
};

export default SwordMiniGameComponent;
