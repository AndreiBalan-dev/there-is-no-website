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

interface RenderWithMouse extends Render {
  mouse?: Matter.Mouse;
}

const MatterComponent: React.FC = () => {
  const [fps, setFps] = React.useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Engine.create();
    const { world } = engine;
    world.gravity.y = 0.1;

    const render: RenderWithMouse = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    let lastTimestamp = performance.now();

    const updateFps = () => {
      const currentTimestamp = performance.now();
      const delta = currentTimestamp - lastTimestamp;
      lastTimestamp = currentTimestamp;
      const currentFps = Math.round(1000 / delta);
      setFps(currentFps);
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

    const mouse = Mouse.create(render.canvas);
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

    Engine.run(engine);
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
        <div className="flex justify-end">FPS: {fps.toFixed(2)}</div>
      </div>
    </>
  );
};

export default MatterComponent;
