import { Bodies, Composite, World, Body } from "matter-js";
import { calculateSizeReductionScale } from "../../utils/resize";

export interface VideoHamburgerMenuProps {
  world: World;
  renderWidth: number;
  renderHeight: number;
}

export class VideoHamburgerMenu {
  private lines: Body[];
  private padding: number;
  private lineWidth: number;
  private lineHeight: number;
  private spacing: number;

  constructor({ world, renderWidth, renderHeight }: VideoHamburgerMenuProps) {
    this.padding = 50;
    this.lineWidth = 5;
    this.lineHeight = 5;
    this.spacing = 8;

    this.lines = this.createHamburgerMenu(renderWidth, renderHeight);
    Composite.add(world, this.lines);
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
      Bodies.rectangle(
        x,
        y + i * (lineHeight + spacing),
        lineWidth,
        lineHeight,
        {
          isStatic: false,
          collisionFilter: {
            group: 1,
            category: 3,
            mask: 2 | 3,
          },
          render: {
            fillStyle: "white",
            strokeStyle: "black",
            lineWidth: 1,
          },
        }
      )
    );
  }

  public resize(world: World, renderWidth: number, renderHeight: number) {
    Composite.remove(world, this.lines);
    this.lines = this.createHamburgerMenu(renderWidth, renderHeight);
    Composite.add(world, this.lines);
  }
}
