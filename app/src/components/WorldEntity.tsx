import React, { useEffect, useRef } from "react";
import Matter, { Engine, Render, World, Mouse, MouseConstraint, Runner, Composite, Bodies } from "matter-js";
import { Render as RenderType, Engine as EngineType } from "matter-js";
import { VideoPlayerBox } from "./(video-player)/VideoPlayerBox";

const MatterComponent: React.FC = () => {
	const [fps, setFps] = React.useState(0);
	const sceneRef = useRef<HTMLDivElement>(null);
	const engineRef = useRef<EngineType>(Engine.create());

	useEffect(() => {
		const engine = engineRef.current;
		const { world } = engine;
		engine.gravity.scale = 0.025;
		engine.gravity.y = 0;

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

		const videoPlayerBox = new VideoPlayerBox({
			world,
			renderWidth: render.options.width || window.innerWidth,
			renderHeight: render.options.height || window.innerHeight,
		});

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

		//Create Youtube Playbutton:
		Composite.add(world, [
			Bodies.polygon(window.innerWidth / 2, window.innerHeight / 2, 3, 35, {
				isStatic: false,
				//Turn off collision:
				collisionFilter: {
					'group': -1,
					'category': 2,
					'mask': 0,
				}
			})
		])

		//Create the three lines of the Youtube video:
		Composite.add(world, [
			//top line:
			Bodies.rectangle(window.innerWidth / 1.45, window.innerWidth / 8.5, 30, 10, {
				isStatic: false,
				collisionFilter: {
					'group': -1,
					'category': 2,
					'mask': 0,
				}
			}),
			//middle line:
			Bodies.rectangle(window.innerWidth / 1.45, window.innerWidth / 8.1, 30, 10, {
				isStatic: false,
				collisionFilter: {
					'group': -1,
					'category': 2,
					'mask': 0,
				}
			}),
			Bodies.rectangle(window.innerWidth / 1.45, window.innerWidth / 7.8, 30, 10, {
				isStatic: false,
				collisionFilter: {
					'group': -1,
					'category': 2,
					'mask': 0,
				}
			})
		])
		World.add(world, mouseConstraint);
		render.mouse = mouse;

		const runner = Runner.create();
		Runner.run(runner, engine);

		const handleResize = () => {
			render.options.width = window.innerWidth;
			render.options.height = window.innerHeight;
			Render.setPixelRatio(render, window.devicePixelRatio || 1);

			videoPlayerBox.resize(
				world,
				render.options.width,
				render.options.height
			);
		};

		window.addEventListener("resize", handleResize);

		Render.run(render);

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
