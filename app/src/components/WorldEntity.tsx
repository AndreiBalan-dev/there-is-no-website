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
  const engineRef = useRef<EngineType>(Engine.create());
  const renderRef = useRef<RenderType | null>(null);

  useEffect(() => {
    const engine = engineRef.current;
    const { world } = engine;
    engine.gravity.scale = 0.025;
    engine.gravity.y = 0; // this inverts gravity

    const render: RenderType = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: true,
      },
    });

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

    const stack = Composites.stack(
      100,
      600 - 21 - 20 * 20,
      10,
      10,
      20,
      0,
      (x: number, y: number) =>
        Bodies.circle(x, y, 20, {
          friction: 0.1,
          frictionAir: 0.01,
          frictionStatic: 0.5,
        })
    );
    Composite.add(world, [
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth - 1500, window.innerHeight - 600, {
        isStatic: true,
        // turn off collisions
        collisionFilter : {
          'group': -1,
          'category': 2,
          'mask': 0,
        }
      })

    ]);

    //Youtube Play button
    Composite.add(world, [
      Bodies.polygon(window.innerWidth / 2, window.innerHeight / 2, 3, 35, {
        isStatic: false,
      } )
    ]) 

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

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const handleResize = () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      Render.setPixelRatio(render, window.devicePixelRatio || 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Matter.Events.off(render, "beforeRender", updateFps);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener("resize", handleResize);
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
