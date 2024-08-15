import { Bodies, Composite, World, Body } from "matter-js";
import { calculateSizeReductionScale } from "../../utils/resize";

export interface VideoPlayButtonProps {
  world: World;
  renderWidth: number;
  renderHeight: number;
}

export class VideoPlayButton {
  public body: Body;

  constructor({ world, renderWidth, renderHeight }: VideoPlayButtonProps) {
    const size = this.getSize(renderWidth);
    this.body = this.createButton(renderWidth, renderHeight, size);
    Composite.add(world, this.body);
  }

  private getSize(renderWidth: number): number {
    const sizeReductionScale = calculateSizeReductionScale(renderWidth);
    const baseSize = 35;
    return sizeReductionScale === 2 ? baseSize : baseSize / sizeReductionScale;
  }

  private createButton(
    renderWidth: number,
    renderHeight: number,
    size: number
  ): Body {
    return Bodies.polygon(renderWidth / 2, renderHeight / 2, 3, size, {
      isStatic: false,
      collisionFilter: {
        group: 2,
        category: 2,
        mask: 1,
      },
      render: {
        fillStyle: "red",
        strokeStyle: "black",
        lineWidth: 2,
      },
      angle: Math.PI,
    });
  }

  public resize(world: World, renderWidth: number, renderHeight: number) {
    Composite.remove(world, this.body);
    const size = this.getSize(renderWidth);
    this.body = this.createButton(renderWidth, renderHeight, size);
    Composite.add(world, this.body);
  }
}
