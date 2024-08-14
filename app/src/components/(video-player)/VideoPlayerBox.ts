import { Bodies, Composite, World, Body } from "matter-js";
import { resize, calculateSizeReductionScale } from "../../utils/resize";

export interface VideoPlayerBoxProps {
	world: World;
	renderWidth: number;
	renderHeight: number;
}

export class VideoPlayerBox {
	public walls: Body[];

	constructor({ world, renderWidth, renderHeight }: VideoPlayerBoxProps) {
		this.walls = this.createWalls(renderWidth, renderHeight);
		Composite.add(world, this.walls);
	}

	private getDimensions(renderWidth: number, renderHeight: number) {
		const sizeReductionScale = calculateSizeReductionScale(renderWidth);
		return resize(
			renderWidth / sizeReductionScale,
			renderHeight / sizeReductionScale
		);
	}

	private createWalls(renderWidth: number, renderHeight: number): Body[] {
		const { width, height } = this.getDimensions(renderWidth, renderHeight);
		const thickness = 1;

		const topWall = Bodies.rectangle(renderWidth / 2, (renderHeight - height) / 2, width, thickness, {
			isStatic: true,
			collisionFilter: {
				group: 0,
				category: 2
			}
		});
		const bottomWall = Bodies.rectangle(renderWidth / 2, (renderHeight + height) / 2, width, thickness, {
			isStatic: true,
			collisionFilter: {
				group: 0,
				category: 2
			}
		});
		const leftWall = Bodies.rectangle((renderWidth - width) / 2, renderHeight / 2, thickness, height, {
			isStatic: true,
			collisionFilter: {
				group: 0,
				category: 2
			}
		});
		const rightWall = Bodies.rectangle((renderWidth + width) / 2, renderHeight / 2, thickness, height, {
			isStatic: true,
			collisionFilter: {
				group: 0,
				category: 2
			}
		});

		return [topWall, bottomWall, leftWall, rightWall];
	}

	public resize(world: World, renderWidth: number, renderHeight: number) {
		Composite.remove(world, this.walls);
		this.walls = this.createWalls(renderWidth, renderHeight);
		Composite.add(world, this.walls);
	}
}
