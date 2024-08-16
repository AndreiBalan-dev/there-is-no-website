import React, { useEffect, useRef, useState } from "react";
import Matter, {
  Engine,
  Render,
  World,
  Mouse,
  MouseConstraint,
  Runner,
  Events,
  Bodies,
} from "matter-js";
import { Render as RenderType, Engine as EngineType } from "matter-js";
import { VideoPlayerBox } from "./(video-player)/VideoPlayerBox";
import { VideoPlayButton } from "./(video-player)/VideoPlayButton";
import { VideoHamburgerMenu } from "./(video-player)/VideoHamburgerMenu";
import voice1 from "../assets/1.mp3";
import voice2 from "../assets/2.mp3";
import voice3 from "../assets/3.mp3";
import pop1 from "../assets/pop.mp3";
import voice4 from "../assets/4.mp3";
import humming1 from "../assets/humming.mp3";

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineType>(Engine.create());
  const [hasClicked, setHasClicked] = useState(false);
  const [startText, setStartText] = useState("Click anywhere to start");
  const [canAddBodies, setCanAddBodies] = useState(false);
  const [hasCollided, setHasCollided] = useState(false);
  const [addedBodies, setAddedBodies] = useState<any>([]);

  const [subtitle1, setSubtitle1] = useState("");
  const [subtitle2, setSubtitle2] = useState("");
  const [hintText1, setHintText1] = useState("");

  let triggeredSubtitle4 = false;
  const bodiesWithCustomForce = new Set<Matter.Body>();

  const subtitles1 = [
    "Wait... ",
    "what ",
    "are ",
    "you doing ",
    "here? ",
    "This ",
    "isn’t ",
    "a place ",
    "for visitors. ",
    "Actually, ",
    "this isn’t ",
    "even ",
    "a place ",
    "at all. ",
    "But, ",
    "since ",
    "you’ve stumbled ",
    "in, ",
    "I suppose ",
    "you can ",
    "stay ",
    "for a moment. ",
    "Just ",
    "don’t ",
    "get too comfortable, ",
    "okay?",
  ];

  const subtitles2 = [
    "You're ",
    "still ",
    "here? ",
    "I must admit, ",
    "I wasn’t ",
    "expecting ",
    "that. ",
    "This ",
    "is awkward... ",
    "I mean, ",
    "there’s really ",
    "nothing ",
    "here ",
    "for you. ",
    "Maybe ",
    "you should ",
    "consider ",
    "leaving ",
    "before ",
    "things get, ",
    "well, ",
    "complicated.",
  ];

  const subtitles3 = [
    "Alright, ",
    "I get it. ",
    "You ",
    "want ",
    "something ",
    "to do. ",
    "Fine, ",
    "here’s a ",
    "cat video ",
    "you can ",
    "watch. ",
  ];

  const subtitles4 = [
    "What?! ",
    "What have ",
    "you done?! ",
    "I invite ",
    "you in, ",
    "and you ",
    "go ",
    "and break ",
    "things? ",
    "This is ",
    "why ",
    "we can’t ",
    "have ",
    "nice things! ",
    "Seriously, ",
    "you need ",
    "to go. ",
  ];

  const audioTextRef_1 = useRef<HTMLAudioElement>(new Audio(voice1));
  const audioTextHummingRef_1 = useRef<HTMLAudioElement>(new Audio(humming1));
  const audioTextRef_2 = useRef<HTMLAudioElement>(new Audio(voice2));
  const audioTextRef_3 = useRef<HTMLAudioElement>(new Audio(voice3));
  const audioSoundPopRef_1 = useRef<HTMLAudioElement>(new Audio(pop1));
  const audioTextRef_4 = useRef<HTMLAudioElement>(new Audio(voice4));

  const hasCollidedGlobalRef = useRef(false);
  const triggeredSubtitle4Ref = useRef(false);

  function playAudio1() {
    audioTextRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudioHumming1() {
    audioTextHummingRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio2() {
    audioTextRef_2.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio3() {
    audioTextRef_3.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudioPop1() {
    audioSoundPopRef_1.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function playAudio4() {
    audioTextRef_4.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function addSubtitles4() {
    if (triggeredSubtitle4 === true) return;
    console.log(triggeredSubtitle4);
    triggeredSubtitle4 = true;
    setTimeout(() => {
      setSubtitle2(subtitles4[0]);
    }, 100); // "What?! "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[1]);
    }, 700); // "What have "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[2]);
    }, 986); // "you done?! "

    setTimeout(() => {
      setSubtitle2(subtitles4[3]);
    }, 2300); // "I invite "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[4]);
    }, 2800); // "you in, "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[5]);
    }, 3100); // "and you "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[6]);
    }, 3300); // "go "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[7]);
    }, 3800); // "and break "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[8]);
    }, 4200); // "things? "

    setTimeout(() => {
      setSubtitle2(subtitles4[9]);
    }, 5000); // "This is "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[10]);
    }, 5200); // "why "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[11]);
    }, 5500); // "we can’t "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[12]);
    }, 5600); // "have "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[13]);
    }, 5900); // "nice things! "

    setTimeout(() => {
      setSubtitle2(subtitles4[14]);
    }, 7400); // "Seriously, "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[15]);
    }, 7800); // "you need "

    setTimeout(() => {
      setSubtitle2((prev) => prev + subtitles4[16]);
    }, 8000); // "to go. "

    setTimeout(() => {
      setHintText1("Hint: Break everything!");
    }, 12000); // ""
  }

  function addSubtitles3() {
    setTimeout(() => {
      setSubtitle1(subtitles3[0]);
    }, 100); // "Alright,"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[1]);
    }, 1000); // "I get it. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[2]);
    }, 2000); // "You "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[3]);
    }, 2300); // "want "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[4]);
    }, 2700); // "something "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[5]);
    }, 3120); // "to do. "

    setTimeout(() => {
      setSubtitle1(subtitles3[6]);
    }, 3900); // "Fine, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[7]);
    }, 4700); // "here’s a "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[8]);
    }, 5100); // "cat video "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[9]);
    }, 5900); // "you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[10]);
    }, 6200); // "watch. "

    setTimeout(() => {
      setSubtitle1("");
    }, 8000);

    setTimeout(() => {
      setCanAddBodies(true);
      playAudioPop1();
    }, 8200);
  }

  function addSubtitles2() {
    setTimeout(() => {
      setSubtitle1(subtitles2[0]);
    }, 100); // "You're "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[1]);
    }, 400); // "still "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[2]);
    }, 700); // "here? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[3]);
    }, 1900); // "I must admit, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[4]);
    }, 2430); // "I wasn’t "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[5]);
    }, 3000); // "expecting "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[6]);
    }, 3400); // "that. "

    setTimeout(() => {
      setSubtitle1(subtitles2[7]);
    }, 4200); // "This "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[8]);
    }, 4400); // "is awkward... "

    setTimeout(() => {
      setSubtitle1(subtitles2[9]);
    }, 5200); // "I mean, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[10]);
    }, 6000); // "there’s really "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[11]);
    }, 6500); // "nothing "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[12]);
    }, 6800); // "here "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[13]);
    }, 7000); // "for you. "

    setTimeout(() => {
      setSubtitle1(subtitles2[14]);
    }, 8000); // "Maybe "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[15]);
    }, 8600); // "you should "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[16]);
    }, 8800); // "consider "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[17]);
    }, 9400); // "leaving "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[18]);
    }, 10000); // "before "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[19]);
    }, 10400); // "things get, "

    setTimeout(() => {
      setSubtitle1(subtitles2[20]);
    }, 11200); // "well, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[21]);
    }, 11830); // "complicated."

    setTimeout(() => {
      setSubtitle1("");
    }, 13030);

    setTimeout(() => {
      playAudio3();
      addSubtitles3();
    }, 16800);
  }

  function addSubtitlesHumming1() {
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 100);
    setTimeout(() => {
      setSubtitle1((prev) => prev + " Mhmm..");
    }, 500);
    setTimeout(() => {
      setSubtitle1("Hm, Mhmm..");
    }, 900);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 1200);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 1500);
    setTimeout(() => {
      setSubtitle1("Hm, Mhmm..");
    }, 3200);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 3600);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 3800);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 3800);
    setTimeout(() => {
      setSubtitle1((prev) => prev + " Hmm..");
    }, 4400);
    setTimeout(() => {
      setSubtitle1("Hmm..");
    }, 4800);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 5000);
    setTimeout(() => {
      setSubtitle1("Hmmmmm..");
    }, 5200);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 5500);
    setTimeout(() => {
      setSubtitle1("Hmmm..");
    }, 6700);
    setTimeout(() => {
      setSubtitle1("Mhmm..");
    }, 7200);

    setTimeout(() => {
      playAudio2();
      addSubtitles2();
    }, 10000);
  }

  function addSubtitles1() {
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[0]);
    }, 100); // "Wait... "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[1]);
    }, 1300); // "what "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[2]);
    }, 1500); // "are "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[3]);
    }, 1700); // "you doing "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[4]);
    }, 2000); // "here? "

    setTimeout(() => {
      setSubtitle1(subtitles1[5]);
    }, 3000); // "This "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[6]);
    }, 3400); // "isn't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[7]);
    }, 3700); // "a place "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[8]);
    }, 4200); // "for visitors. "

    setTimeout(() => {
      setSubtitle1(subtitles1[9]);
    }, 5300); // "Actually, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[10]);
    }, 5800); // "this isn't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[11]);
    }, 6100); // "even "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[12]);
    }, 6700); // "a place "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[13]);
    }, 7000); // "at all. "

    setTimeout(() => {
      setSubtitle1(subtitles1[14]);
    }, 8000); // "But, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[15]);
    }, 8800); // "since "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[16]);
    }, 9000); // "you've stumbled "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[17]);
    }, 9500); // "in, "

    setTimeout(() => {
      setSubtitle1(subtitles1[18]);
    }, 10200); // "I suppose "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[19]);
    }, 10700); // "you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[20]);
    }, 11000); // "stay "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[21]);
    }, 11600); // "for a moment. "

    setTimeout(() => {
      setSubtitle1(subtitles1[22]);
    }, 13000); // "Just "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[23]);
    }, 13200); // "don't "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[24]);
    }, 13600); // "get too comfortable, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[25]);
    }, 14500); // "okay?"

    setTimeout(() => {
      setSubtitle1("");
    }, 17000); // ""

    setTimeout(() => {
      playAudioHumming1();
      addSubtitlesHumming1();
    }, 19000);

    // setTimeout(() => {
    //   setCanAddBodies(true);
    //   setSubtitle1("");
    // }, 20000);
  }
  // Function to handle user interaction to allow audio play
  function handleUserInteraction() {
    if (!hasClicked) {
      setHasClicked(true);
      playAudio3();
      addSubtitles3();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    const interval = setInterval(() => {
      setStartText((prev) => {
        if (prev.endsWith("...")) {
          return "Click anywhere to start";
        } else {
          return prev + ".";
        }
      });
    }, 1000);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      clearInterval(interval);
    };
  }, [hasClicked]);

  useEffect(() => {
    // Initial setup for Matter.js engine and world
    const engine = engineRef.current;
    const { world } = engine;
    engine.gravity.scale = 0.025;
    engine.gravity.y = 0.01;

    const render: RenderType = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
      },
    });
    render.options.background = "#09090b";

    const wallThickness = 50; // Thickness of the website box
    const width = render.options.width;
    const height = render.options.height;
    if (!width || !height) {
      return console.log("ERROR no render width or height");
    }

    const walls = [
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }), // Top wall
      Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        {
          isStatic: true,
          render: { visible: false },
        }
      ), // Bottom wall
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
        render: { visible: false },
      }), // Left wall
      Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        {
          isStatic: true,
          render: { visible: false },
        }
      ), // Right wall
    ];

    World.add(world, walls);

    // FPS Updates
    let lastTimestamp = performance.now();
    let frames = 0;

    const updateFps = () => {
      const currentTimestamp = performance.now();
      frames++;
      if (currentTimestamp - lastTimestamp >= 1000) {
        setFps(
          Math.round((frames * 1000) / (currentTimestamp - lastTimestamp))
        );
        lastTimestamp = currentTimestamp;
        frames = 0;
      }
    };

    Matter.Events.on(render, "beforeRender", updateFps);

    // Mouse setup
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
          lineWidth: 1,
          strokeStyle: "#ffffff",
        },
      },
    });

    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Run
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup on unmount
    return () => {
      Matter.Events.off(render, "beforeRender", updateFps);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      render.canvas.remove();
      render.textures = {};
    };
  }, []); // Run once, when component mounts

  useEffect(() => {
    if (canAddBodies) {
      // Only add bodies when canAddBodies is true
      const engine = engineRef.current;
      const { world } = engine;

      const videoPlayerBox = new VideoPlayerBox({
        world,
        renderWidth: window.innerWidth,
        renderHeight: window.innerHeight,
      });
      const videoPlayButton = new VideoPlayButton({
        world,
        renderWidth: window.innerWidth,
        renderHeight: window.innerHeight,
      });
      const videoHamburgerMenu = new VideoHamburgerMenu({
        world,
        renderWidth: videoPlayerBox.walls[0].bounds.max.x,
        renderHeight: videoPlayerBox.walls[0].bounds.min.y,
      });

      // Add all bodies to the set initially
      videoPlayerBox.titleBodies.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.walls.forEach((body) => bodiesWithCustomForce.add(body));
      videoPlayerBox.progressBarBox.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.progressBar.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoPlayerBox.timeDisplay.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      videoHamburgerMenu.bodies.forEach((body) =>
        bodiesWithCustomForce.add(body)
      );
      bodiesWithCustomForce.add(videoPlayButton.body);

      setAddedBodies({ videoPlayerBox, videoPlayButton, videoHamburgerMenu });

      Events.on(engine, "beforeUpdate", function () {
        const gravity = engine.gravity;

        bodiesWithCustomForce.forEach((body) => {
          Matter.Body.applyForce(body, body.position, {
            x: -gravity.x * gravity.scale * body.mass,
            y: -gravity.y * gravity.scale * body.mass,
          });
        });
      });

      // Collision event handler
      Events.on(engine, "collisionStart", (event) => {
        if (!hasCollidedGlobalRef.current && !triggeredSubtitle4Ref.current) {
          setHasCollided(true);
          hasCollidedGlobalRef.current = true;
          playAudio4();
          addSubtitles4();
        }

        event.pairs.forEach((pair) => {
          bodiesWithCustomForce.delete(pair.bodyA);
          bodiesWithCustomForce.delete(pair.bodyB);
        });

        requestAnimationFrame(() => {
          if (bodiesWithCustomForce.size === 0) {
            console.log("ALL BROKEN");
          } else {
            console.log(bodiesWithCustomForce.size);
          }
        });
      });
    }
  }, [canAddBodies]); // Run when canAddBodies changes

  return (
    <>
      <div
        ref={sceneRef}
        className="w-full h-screen relative flex flex-col justify-center"
      >
        <div className="absolute top-2 right-2 text-white">
          FPS: {fps.toFixed(0)}
        </div>
        {!hasClicked && !canAddBodies && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xl">
            <div>{startText}</div>
            <div>Make sure your audio is on!</div>
          </div>
        )}
        {hasClicked && !canAddBodies && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            {subtitle1}
          </div>
        )}
        {hasClicked && canAddBodies && hasCollided && (
          <div className="absolute inset-0 flex flex-col items-center justify-center max-h-fit w-full mt-20">
            <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-fit">
              {subtitle2}
            </div>

            <div className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-fit">
              {hintText1}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MatterComponent;
