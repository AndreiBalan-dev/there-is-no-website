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
import voice4 from "../assets/4.mp3";
import humming1 from "../assets/humming.mp3";

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineType>(Engine.create());
  const [hasClicked, setHasClicked] = useState(false);
  const [startText, setStartText] = useState("Click anywhere to start");
  const [canAddBodies, setCanAddBodies] = useState(false);
  const [addedBodies, setAddedBodies] = useState<any>([]);

  const [subtitle1, setSubtitle1] = useState("");

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
  const audioTextRef_4 = useRef<HTMLAudioElement>(new Audio(voice4));

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

  function playAudio4() {
    audioTextRef_4.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function addSubtitles4() {
    setTimeout(() => {
      setSubtitle1(subtitles4[0]);
    }, 100); // "What?! "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[1]);
    }, 400); // "What have "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[2]);
    }, 800); // "you done?! "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[3]);
    }, 1300); // "I invite "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[4]);
    }, 1800); // "you in, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[5]);
    }, 2300); // "and you "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[6]);
    }, 2700); // "go "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[7]);
    }, 3100); // "and break "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[8]);
    }, 3700); // "things? "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[9]);
    }, 4200); // "This is "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[10]);
    }, 4700); // "why "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[11]);
    }, 5100); // "we can’t "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[12]);
    }, 5600); // "have "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[13]);
    }, 5900); // "nice things! "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[14]);
    }, 6500); // "Seriously, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[15]);
    }, 7100); // "you need "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles4[16]);
    }, 7500); // "to go. "
  }

  function addSubtitles3() {
    setTimeout(() => {
      setSubtitle1(subtitles3[0]);
    }, 100); // "Alright,"

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[1]);
    }, 600); // "I get it. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[2]);
    }, 1200); // "You "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[3]);
    }, 1600); // "want "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[4]);
    }, 1900); // "something "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[5]);
    }, 2400); // "to do. "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[6]);
    }, 3000); // "Fine, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[7]);
    }, 3400); // "here’s a "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[8]);
    }, 3900); // "cat video "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[9]);
    }, 4500); // "you can "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles3[10]);
    }, 4800); // "watch. "

    setTimeout(() => {
      playAudio4();
      addSubtitles4();
    }, 12000);
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
    }, 1200); // "I must admit, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[4]);
    }, 1800); // "I wasn’t "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[5]);
    }, 2300); // "expecting "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[6]);
    }, 2700); // "that. "

    setTimeout(() => {
      setSubtitle1(subtitles2[7]);
    }, 3200); // "This "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[8]);
    }, 3500); // "is awkward... "

    setTimeout(() => {
      setSubtitle1(subtitles2[9]);
    }, 4300); // "I mean, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[10]);
    }, 5000); // "there’s really "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[11]);
    }, 5600); // "nothing "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[12]);
    }, 6000); // "here "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[13]);
    }, 6400); // "for you. "

    setTimeout(() => {
      setSubtitle1(subtitles2[14]);
    }, 7200); // "Maybe "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[15]);
    }, 7600); // "you should "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[16]);
    }, 8100); // "consider "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[17]);
    }, 8600); // "leaving "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[18]);
    }, 9200); // "before "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[19]);
    }, 9700); // "things get, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[20]);
    }, 10400); // "well, "

    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles2[21]);
    }, 10800); // "complicated."

    setTimeout(() => {
      playAudio3();
      addSubtitles3();
    }, 17000);
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
      setSubtitle1((prev) => prev + " Mhmm..");
    }, 1500);

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
      setSubtitle1((prev) => prev + subtitles1[5]);
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
      setSubtitle1((prev) => prev + subtitles1[18]);
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
    }, 1700); // ""

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
      playAudio1();
      addSubtitles1();
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
    // Initialiazation
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
      return console.log("ERROR no render width or length");
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

    const bodiesWithCustomForce = new Set<Matter.Body>();

    // Entities
    if (canAddBodies) {
      console.log("YEEE");
      const videoPlayerBox = new VideoPlayerBox({
        world,
        renderWidth: render.options.width || window.innerWidth,
        renderHeight: render.options.height || window.innerHeight,
      });
      const videoPlayButton = new VideoPlayButton({
        world,
        renderWidth: render.options.width || window.innerWidth,
        renderHeight: render.options.height || window.innerHeight,
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
    }

    // Collision event handler
    Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        bodiesWithCustomForce.delete(pair.bodyA);
        bodiesWithCustomForce.delete(pair.bodyB);
      });
    });

    Events.on(engine, "beforeUpdate", function () {
      var gravity = engine.gravity;

      bodiesWithCustomForce.forEach((body) => {
        Matter.Body.applyForce(body, body.position, {
          x: -gravity.x * gravity.scale * body.mass,
          y: -gravity.y * gravity.scale * body.mass,
        });
      });
    });

    // Mouse
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

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, "mousedown", function (event) {
      var mousePosition = event.mouse.position;
      console.log("mousedown at " + mousePosition.x + " " + mousePosition.y);
      console.log(addedBodies);
      if (
        mouseConstraint.body &&
        addedBodies.videoPlayButton &&
        mouseConstraint.body === addedBodies.videoPlayButton.body
      ) {
        const body = mouseConstraint.body;
        bodiesWithCustomForce.delete(body);
      }
    });

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, "mouseup", function (event) {
      var mousePosition = event.mouse.position;
      console.log("mouseup at " + mousePosition.x + " " + mousePosition.y);
    });

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, "startdrag", function (event) {
      console.log("startdrag", event);
    });

    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, "enddrag", function (event) {
      console.log("enddrag", event);
    });

    return () => {
      Matter.Events.off(render, "beforeRender", updateFps);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      render.canvas.remove();
      render.textures = {};
    };
  }, [canAddBodies]);

  return (
    <>
      <div ref={sceneRef} className="w-full h-screen relative">
        <div className="absolute top-2 right-2 text-white">
          FPS: {fps.toFixed(0)}
        </div>
        {!hasClicked && !canAddBodies && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
            {startText}
          </div>
        )}
        {hasClicked && !canAddBodies && (
          <div className="absolute inset-0 flex items-center justify-center text-white sm:text-2xl md:text-3xl lg:text-4xl">
            {subtitle1}
          </div>
        )}
      </div>
    </>
  );
};

export default MatterComponent;
