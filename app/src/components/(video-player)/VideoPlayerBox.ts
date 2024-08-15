import { Bodies, Composite, World, Body } from "matter-js";
import { resize, calculateSizeReductionScale } from "../../utils/resize";
import cat from "../../assets/smallSizedCatImage.jpg";

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
    const thickness = 300;

    console.log(cat);
    const playerBox = Bodies.rectangle(
      renderWidth / 2,
      renderHeight / 2,
      width,
      thickness,
      {
        isStatic: true,
        collisionFilter: {
          group: -1,
          category: 2,
          mask: 0,
        },
        render: {
          sprite: {
            texture: cat,
            xScale: width / 300,
            yScale: height / 140,
          },
        },
      }
    );
    console.log(playerBox);

    return [playerBox];
  }

  public resize(world: World, renderWidth: number, renderHeight: number) {
    Composite.remove(world, this.walls);
    this.walls = this.createWalls(renderWidth, renderHeight);
    Composite.add(world, this.walls);
  }
}
