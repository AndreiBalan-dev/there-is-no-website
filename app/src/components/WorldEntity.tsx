import React, { useEffect, useRef } from "react";
import Matter, { Engine, Render, World, Mouse, MouseConstraint, Runner } from "matter-js";
import { Render as RenderType, Engine as EngineType } from "matter-js";
import { VideoPlayerBox } from "./(video-player)/VideoPlayerBox";

const MatterComponent: React.FC = () => {
	const [fps, setFps] = React.useState(0);
	const sceneRef = useRef<HTMLDivElement>(null);
	const engineRef = useRef<EngineType>(Engine.create());
	const videoPlayerBoxRef = useRef<VideoPlayerBox | null>(null);

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

		videoPlayerBoxRef.current = new VideoPlayerBox({
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

		World.add(world, mouseConstraint);
		render.mouse = mouse;

		const runner = Runner.create();
		Runner.run(runner, engine);

		const handleResize = () => {
			render.options.width = window.innerWidth;
			render.options.height = window.innerHeight;
			Render.setPixelRatio(render, window.devicePixelRatio || 1);

			videoPlayerBoxRef.current?.resize(
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
