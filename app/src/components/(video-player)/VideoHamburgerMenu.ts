import { Bodies, Composite, World, Body } from "matter-js";
import { calculateSizeReductionScale } from "../../utils/resize";

export interface VideoHamburgerMenuProps {
  world: World;
  renderWidth: number;
  renderHeight: number;
}

export class VideoHamburgerMenu {
  public bodies: Body[];
  private padding: number;
  private lineWidth: number;
  private lineHeight: number;
  private spacing: number;

  constructor({ world, renderWidth, renderHeight }: VideoHamburgerMenuProps) {
    this.padding = 50;
    this.lineWidth = 5;
    this.lineHeight = 5;
    this.spacing = 30;

    this.bodies = this.createHamburgerMenu(renderWidth, renderHeight);
    Composite.add(world, this.bodies);
  }

  private getScaledSizes(renderWidth: number) {
    let scale = calculateSizeReductionScale(renderWidth);
    scale = scale === 1.5 ? scale : 2;
    return {
      padding: this.padding / scale,
      lineWidth: this.lineWidth / scale,
      lineHeight: this.lineHeight / scale,
      spacing: this.spacing / scale,
    };
  }

  private createHamburgerMenu(
    renderWidth: number,
    renderHeight: number
  ): Body[] {
    const { padding, lineWidth, lineHeight, spacing } =
      this.getScaledSizes(renderWidth);
    const x = renderWidth - padding - lineWidth / 2;
    const y = renderHeight + padding + lineHeight / 2;

    return [0, 1, 2].map((i) =>
      Bodies.circle(x, y + i * (lineHeight + spacing), 7, {
        isStatic: false,
        collisionFilter: {
          group: 2,
          category: 2,
          mask: 2,
        },
        render: {
          fillStyle: "white",
          strokeStyle: "black",
          lineWidth: 1,
        },
      })
    );
  }

  public resize(world: World, renderWidth: number, renderHeight: number) {
    Composite.remove(world, this.bodies);
    this.bodies = this.createHamburgerMenu(renderWidth, renderHeight);
    Composite.add(world, this.bodies);
  }
}
