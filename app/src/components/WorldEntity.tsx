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

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EngineType>(Engine.create());
  const [hasClicked, setHasClicked] = useState(false);

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

    // Entities
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
    console.log(videoPlayerBox);

    const bodiesWithCustomForce = new Set<Matter.Body>();

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
      if (mouseConstraint.body && mouseConstraint.body.isStatic) {
        const body = mouseConstraint.body;
        Matter.Body.setStatic(body, !mouseConstraint.body.isStatic);
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
      </div>
    </>
  );
};

export default MatterComponent;
