import { Bodies, Composite, World, Body } from "matter-js";
import { calculateSizeReductionScale } from "../../utils/resize";

export interface VideoHamburgerMenuProps {
  world: World;
  renderWidth: number;
  renderHeight: number;
}

export class VideoHamburgerMenu {
  public bodies: Body[];
  private paddingX: number;
  private paddingY: number;
  private lineWidth: number;
  private lineHeight: number;
  private spacing: number;
  private radius: number;

  constructor({ world, renderWidth, renderHeight }: VideoHamburgerMenuProps) {
    this.paddingX = 65;
    this.paddingY = 70;
    this.lineWidth = 5;
    this.lineHeight = 5;
    this.spacing = 12;
    this.radius = 5;

    this.bodies = this.createHamburgerMenu(renderWidth, renderHeight);
    Composite.add(world, this.bodies);
  }

  private getScaledSizes(renderWidth: number) {
    let scale = calculateSizeReductionScale(renderWidth);
    scale = scale === 1.2 ? 2.5 : scale;
    this.paddingY = scale === 2 ? this.paddingY - 50 : this.paddingY
    return {
      paddingX: this.paddingX / scale,
      paddingY: this.paddingY / scale,
      lineWidth: this.lineWidth / scale,
      lineHeight: this.lineHeight / scale,
      spacing: this.spacing / scale,
      radius: this.radius / scale
    };
  }

  private createHamburgerMenu(
    renderWidth: number,
    renderHeight: number
  ): Body[] {
    const { paddingX, paddingY, lineWidth, lineHeight, spacing, radius } =
      this.getScaledSizes(renderWidth);
    const x = renderWidth - paddingX - lineWidth / 2;
    const y = renderHeight + paddingY + lineHeight / 2;

    return [0, 1, 2].map((i) =>
      Bodies.circle(x, y + i * (lineHeight + spacing), radius, {
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
