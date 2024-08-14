import { Bodies, Composite, World, Body } from "matter-js";
import { resize, calculateSizeReductionScale } from "../../utils/resize";

export interface VideoPlayerBoxProps {
	world: World;
	renderWidth: number;
	renderHeight: number;
}

export class VideoPlayerBox {
	public box: Body;

	constructor({ world, renderWidth, renderHeight }: VideoPlayerBoxProps) {
		const { width, height } = this.getDimensions(renderWidth, renderHeight);
		this.box = Bodies.rectangle(
			renderWidth / 2,
			renderHeight / 2,
			width,
			height,
			{
				isStatic: true,
			}
		);
		Composite.add(world, this.box);
	}

	private getDimensions(renderWidth: number, renderHeight: number) {
		const sizeReductionScale = calculateSizeReductionScale(renderWidth);
		return resize(
			renderWidth / sizeReductionScale,
			renderHeight / sizeReductionScale
		);
	}

	public resize(world: World, renderWidth: number, renderHeight: number) {
		Composite.remove(world, this.box);
		const { width, height } = this.getDimensions(renderWidth, renderHeight);
		this.box = Bodies.rectangle(
			renderWidth / 2,
			renderHeight / 2,
			width,
			height,
			{
				isStatic: true,
			}
		);
		Composite.add(world, this.box);
	}
}
