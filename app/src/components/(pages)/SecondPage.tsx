import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import swordSound from "../../assets/sword-slash.mp3";
import sword from "../../assets/sword.png";
import bombPotion from "../../assets/bomb.png";
import throttle from "lodash.throttle";

type Bomb = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

interface SwordGameComponentProps {
  onComplete: () => void;
}

const SwordMiniGameComponent: React.FC<SwordGameComponentProps> = ({
  onComplete,
}) => {
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [bombCount, setBombCount] = useState(0);
  const [slicedCount, setSlicedCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const swordRef = useRef<HTMLDivElement>(null);
  const [playSwordSound] = useSound(swordSound);

  useEffect(() => {
    playSwordSound();
  }, [playSwordSound]);

  // Handle starting the game
  useEffect(() => {
    const startGame = () => {
      setGameStarted(true);
    };

    if (firstLoad) {
      const timeoutId = setTimeout(() => {
        startGame();
        setFirstLoad(false);
      }, 14000);
      return () => clearTimeout(timeoutId);
    } else {
      startGame();
    }
  }, [firstLoad]);

  // Handle bomb generation
  useEffect(() => {
    const generateBomb = () => {
      if (bombCount < 15) {
        const id = Math.random();
        const screenWidth = window.innerWidth;
        const bombWidth = 24; // Adjust to the bomb's width
        const minX = bombWidth;
        const maxX = screenWidth - bombWidth;
        const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const speed = 3 + Math.random() * 3;
        setBombs((prevBombs) => [...prevBombs, { id, x, y: 0, speed }]);
        setBombCount((prevCount) => prevCount + 1);
      }
    };

    if (gameStarted && !gameOver) {
      const bombInterval = setInterval(generateBomb, 1000);
      return () => clearInterval(bombInterval);
    }
  }, [gameStarted, gameOver, bombCount]);

  // Handle bomb movement
  useEffect(() => {
    let animationFrameId: number;

    const moveBombs = () => {
      setBombs((prevBombs) =>
        prevBombs.map((bomb) => ({
          ...bomb,
          y: bomb.y + bomb.speed,
        }))
      );
      animationFrameId = requestAnimationFrame(moveBombs);
    };

    if (gameStarted && !gameOver) {
      animationFrameId = requestAnimationFrame(moveBombs);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [gameStarted, gameOver]);

  // Handle bomb checking and game reset
  useEffect(() => {
    const checkBombs = () => {
      bombs.forEach((bomb) => {
        if (bomb.y > window.innerHeight) {
          setGameOver(true);
          setBombCount(0);
          setSlicedCount(0);
          setBombs([]);
          setTimeout(() => {
            setGameOver(false);
            setGameStarted(true);
          }, 1000);
        }
      });
    };

    if (gameStarted && bombs.length > 0 && !gameOver) {
      const checkInterval = setInterval(checkBombs, 16);
      return () => clearInterval(checkInterval);
    }
  }, [bombs, gameStarted, gameOver]);

  // Throttled sword movement to optimize performance
  const handleMouseMove = useCallback(
    throttle((event: React.MouseEvent) => {
      if (swordRef.current) {
        swordRef.current.style.left = `${event.clientX}px`;
        swordRef.current.style.top = `${event.clientY}px`;
      }
    }, 16),
    []
  );

  const handleTouchMove = useCallback(
    throttle((event: React.TouchEvent) => {
      if (swordRef.current) {
        const touch = event.touches[0];
        swordRef.current.style.left = `${touch.clientX}px`;
        swordRef.current.style.top = `${touch.clientY}px`;
      }
    }, 16),
    []
  );

  const handleSlice = useCallback(
    (bombId: number) => {
      setBombs((prevBombs) => prevBombs.filter((bomb) => bomb.id !== bombId));
      setSlicedCount((prevCount) => prevCount + 1);
      playSwordSound();
      if (slicedCount + 1 >= 15) {
        setGameOver(true);
        onComplete();
      }
    },
    [playSwordSound, slicedCount, onComplete]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="w-screen h-screen overflow-hidden relative cursor-none"
    >
      <div
        ref={swordRef}
        className="absolute w-14 h-14 bg-center bg-no-repeat bg-cover pointer-events-none transform -scale-x-100"
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
          onTouchStart={() => handleSlice(bomb.id)}
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
