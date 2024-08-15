import { Bodies, Composite, World, Body } from "matter-js";
import cat from "../../assets/smallSizedCatImageShadow.png";
// Import letter assets
import fImg from "../../assets/f.png";
import uImg from "../../assets/u.png";
import nImg from "../../assets/n.png";
import yImg from "../../assets/y.png";
import cImg from "../../assets/c.png";
import aImg from "../../assets/a.png";
import tImg from "../../assets/t.png";
import vImg from "../../assets/v.png";
import iImg from "../../assets/i.png";
import dImg from "../../assets/d.png";
import eImg from "../../assets/e.png";
import oImg from "../../assets/o.png";
import mImg from "../../assets/m.png";
import pImg from "../../assets/p.png";
import dotImg from "../../assets/dot.png";
import fourImg from "../../assets/4.png";
// Import digit and separator placeholders
import zeroImg from "../../assets/0.png";
import oneImg from "../../assets/1.png";
import twoImg from "../../assets/2.png";
import threeImg from "../../assets/3.png";
import colonImg from "../../assets/colon.png"; // Placeholder for ':'

const letterTextures: { [key: string]: string } = {
  f: fImg,
  u: uImg,
  n: nImg,
  y: yImg,
  c: cImg,
  a: aImg,
  t: tImg,
  v: vImg,
  i: iImg,
  d: dImg,
  e: eImg,
  o: oImg,
  m: mImg,
  p: pImg,
  ".": dotImg,
  "4": fourImg,
};

const timeTextures: { [key: string]: string } = {
  "0": zeroImg,
  "1": oneImg,
  "2": twoImg,
  "3": threeImg,
  ":": colonImg,
};

export interface VideoPlayerBoxProps {
  world: World;
  renderWidth: number;
  renderHeight: number;
}

export class VideoPlayerBox {
  public walls: Body[];
  public titleBodies: Body[];
  public progressBarBox: Body[];
  public progressBar: Body[];
  public timeDisplay: Body[];

  constructor({ world, renderWidth, renderHeight }: VideoPlayerBoxProps) {
    this.walls = this.createWalls(renderWidth, renderHeight);
    this.titleBodies = this.createTitle(renderWidth, renderHeight);
    this.progressBarBox = this.createProgressBarBox(renderWidth, renderHeight);
    this.progressBar = this.createProgressBar(renderWidth, renderHeight);
    this.timeDisplay = this.createTimeDisplay(renderWidth, renderHeight);

    Composite.add(world, [
      ...this.walls,
      ...this.titleBodies,
      ...this.progressBarBox,
      ...this.progressBar,
      ...this.timeDisplay,
    ]);
  }

  private getDimensions(renderWidth: number): {
    width: number;
    height: number;
  } {
    let width: number;
    let height: number;

    if (renderWidth < 600) {
      width = 320;
      height = 180;
    } else if (renderWidth >= 600 && renderWidth < 1200) {
      width = 480;
      height = 270;
    } else {
      width = 640;
      height = 360;
    }

    return { width, height };
  }

  private createWalls(renderWidth: number, renderHeight: number): Body[] {
    const { width, height } = this.getDimensions(renderWidth);

    const playerBox = Bodies.rectangle(
      renderWidth / 2,
      renderHeight / 2,
      width,
      height,
      {
        isStatic: false,
        collisionFilter: {
          group: -1,
          category: 2,
          mask: 1,
        },
        render: {
          sprite: {
            texture: cat,
            xScale: width / 320,
            yScale: height / 180,
          },
        },
      }
    );

    return [playerBox];
  }

  private createTitle(renderWidth: number, renderHeight: number): Body[] {
    const title = "funny cat video.mp4";
    const letterWidth = 15;
    const letterHeight = 20;
    const paddingX = 30;
    const paddingY = 30;

    const bodies: Body[] = [];
    let startX =
      renderWidth / 2 - this.getDimensions(renderWidth).width / 2 + paddingX;
    const startY =
      renderHeight / 2 - this.getDimensions(renderWidth).height / 2 + paddingY;

    for (let i = 0; i < title.length; i++) {
      const letter = title[i].toLowerCase();
      if (letterTextures[letter]) {
        let assignY = 0;
        if (letter === ".") {
          assignY += 3;
        }
        const letterBody = Bodies.rectangle(
          startX + i * (letterWidth + 2),
          startY + assignY,
          letterWidth,
          letterHeight,
          {
            isStatic: false,
            render: {
              sprite: {
                texture: letterTextures[letter],
                xScale: 0.04,
                yScale: 0.03,
              },
            },
            collisionFilter: {
              group: 2,
              category: 2,
              mask: 1,
            },
          }
        );
        bodies.push(letterBody);
      }
    }

    return bodies;
  }

  private createProgressBar(renderWidth: number, renderHeight: number): Body[] {
    const { width } = this.getDimensions(renderWidth);
    const barWidth = width - 20 - 50 - 55;
    const barHeight = 10;
    const paddingBottom = 15;

    const progressBar = Bodies.rectangle(
      renderWidth / 2 + 44,
      renderHeight / 2 +
        this.getDimensions(renderWidth).height / 2 -
        paddingBottom,
      barWidth,
      barHeight,
      {
        isStatic: false,
        render: {
          fillStyle: "#71797E",
        },
        collisionFilter: {
          group: 2,
          category: 2,
          mask: 1,
        },
      }
    );

    return [progressBar];
  }

  private createProgressBarBox(
    renderWidth: number,
    renderHeight: number
  ): Body[] {
    const { width } = this.getDimensions(renderWidth);
    const barWidth = width;
    const barHeight = 30;
    const paddingBottom = 15;

    const progressBar = Bodies.rectangle(
      renderWidth / 2,
      renderHeight / 2 +
        this.getDimensions(renderWidth).height / 2 -
        paddingBottom,
      barWidth,
      barHeight,
      {
        isStatic: false,
        render: {
          fillStyle: "#191919",
        },
        collisionFilter: {
          group: 3,
          category: 2,
          mask: 1,
        },
      }
    );

    return [progressBar];
  }

  private createTimeDisplay(renderWidth: number, renderHeight: number): Body[] {
    const { width, height } = this.getDimensions(renderWidth);
    const timeWidth = 15; // Width of each character in the time display
    const timeHeight = 20; // Height of each character in the time display
    const paddingLeft = 15;
    const paddingBottom = 20;

    const timeText = "01:23"; // Example time to display (each character will be a separate image)
    const bodies: Body[] = [];
    let startX = renderWidth / 2 - width / 2 + paddingLeft;
    const startY = renderHeight / 2 + height / 2 - paddingBottom + 5;

    for (let i = 0; i < timeText.length; i++) {
      const char = timeText[i];
      if (timeTextures[char]) {
        const timeCharBody = Bodies.rectangle(
          startX + i * (timeWidth + 2),
          startY,
          timeWidth,
          timeHeight,
          {
            isStatic: false,
            render: {
              sprite: {
                texture: timeTextures[char],
                xScale: 0.04,
                yScale: 0.03,
              },
            },
            collisionFilter: {
              group: 2,
              category: 2,
              mask: 1,
            },
          }
        );
        bodies.push(timeCharBody);
      }
    }

    return bodies;
  }
}
