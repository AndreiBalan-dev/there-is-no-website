import React, { useEffect, useRef } from "react";
import Matter, {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Composites,
  Composite,
  Runner,
} from "matter-js";
import {
  Render as RenderType,
  Engine as EngineType,
  Mouse as MouseType,
} from "matter-js";

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine: EngineType = Engine.create();
    const { world } = engine;
    engine.gravity.y = 0.1;

    const render: RenderType = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    let lastTimestamp = performance.now();
    let frames = 0;

    const updateFps = () => {
      const currentTimestamp = performance.now();
      frames++;
      if (currentTimestamp - lastTimestamp >= 1000){
        const currentFps = Math.round(frames * 1000 / (currentTimestamp - lastTimestamp));
        setFps(currentFps);
        lastTimestamp = currentTimestamp;
        frames = 0;
      }
    };

    Matter.Events.on(render, "beforeRender", updateFps);

    var stack = Composites.stack(
      100,
      600 - 21 - 20 * 20,
      10,
      10,
      20,
      0,
      function (x: number, y: number) {
        return Bodies.circle(x, y, 20, {
          friction: 0.1,
          frictionAir: 0.01,
          frictionStatic: 0.5,
        });
      }
    );
    // @ts-ignore
    Composite.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
      stack,
    ]);

    const mouse: MouseType = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      // @ts-ignore
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
          lineWidth: 1,
          strokeStyle: "#ffffff",
        },
      },
    });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    Runner.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      World.clear(world, false);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <>
      <div ref={sceneRef}>
        <div className="flex justify-end">FPS: {fps.toFixed(0)}</div>
      </div>
    </>
  );
};

export default MatterComponent;
