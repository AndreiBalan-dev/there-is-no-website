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
import audioFile from "../assets/1.mp3";
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

  const audioRef = useRef<HTMLAudioElement>(new Audio(audioFile));

  function playAudio() {
    audioRef.current
      .play()
      .catch((error) => console.error("Audio play error:", error));
  }

  function addSubtitles1() {
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[0]);
    }, 100);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[1]);
    }, 1300);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[2]);
    }, 1500);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[3]);
    }, 1700);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[4]);
    }, 2100);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[5]);
    }, 3200);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[6]);
    }, 3500);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[7]);
    }, 3800);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[8]);
    }, 4300);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[9]);
    }, 5300);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[10]);
    }, 5600);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[11]);
    }, 6100);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[12]);
    }, 6400);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[13]);
    }, 6800);

    setTimeout(() => {
      setSubtitle1(subtitles1[14]);
    }, 8000);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[15]);
    }, 8200);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[16]);
    }, 8800);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[17]);
    }, 9200);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[18]);
    }, 9800);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[19]);
    }, 10300);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[20]);
    }, 11000);
    setTimeout(() => {
      setSubtitle1((prev) => prev + subtitles1[21]);
    }, 11400);
  }
  // Function to handle user interaction to allow audio play
  function handleUserInteraction() {
    if (!hasClicked) {
      setHasClicked(true);
      playAudio();
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
  }, []);

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
  }, []);

  return (
    <>
      <div ref={sceneRef} className="w-full h-screen relative">
        <div className="absolute top-2 right-2 text-white">
          FPS: {fps.toFixed(0)}
        </div>
        {!hasClicked && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {startText}
          </div>
        )}
        {hasClicked && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {subtitle1}
          </div>
        )}
      </div>
    </>
  );
};

export default MatterComponent;
