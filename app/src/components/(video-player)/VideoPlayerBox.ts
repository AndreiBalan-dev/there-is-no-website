import { Bodies, Composite, World, Body } from "matter-js";
// import cat from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/smallSizedCatImageShadow-min-vfDwIcMqalDdojt4XManM6oVab8IjF.png";
// // Import letter assets
// import fImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/f-min-ONnefclg8aEykZinPfe4TaU2mr2luL.png";
// import uImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/u-min-1NrxESXwcwqBCAX3mpr1mlP8pptSPy.png";
// import nImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/n-min-j6v9g9mhkvcJIn3gCXix0IWprfVipv.png";
// import yImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/y-min-vsg66EfJfJ0ltYY2Glk2jOD7vKblUI.png";
// import cImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/c-min-RJh0JOnJ7rLxtenkMmBileQJuTQUtF.png";
// import aImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/a-min-iK2MSegZfXlLefXaSqkAaPSwHnT2YP.png";
// import tImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/t-min-5zT4sVkM1w0jdfTjI4I6HEsSpqlz0I.png";
// import vImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/v-min-glYqZVEjDwjc6PGYVdIaCHDupazPFN.png";
// import iImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/i-min-nXs3Ss52KEycSn0ZR5ZJf62tEoUupC.png";
// import dImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/d-min-TpaWLnEYjhnmA6wbme5gEgWEDt26F3.png";
// import eImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/e-min-48MFLWrn9ThILAujSws79RtUEuh5GO.png";
// import oImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/o-min-HwMTmeM100CrJeWfwgIWw43ubZY7QZ.png";
// import mImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/m-min-HwMTmeM100CrJeWfwgIWw43ubZY7QZ.png";
// import pImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/p-min-TB0DXIVYxKUKBGqB1ycmIYIzHsKYnn.png";
// import dotImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/dot-min-4lm3TPE2Y1y4nJlwwzz0gIjLoEfAP1.png";
// import fourImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/4-min-awHdHnlsGsXlCf2UUZK9I9WkZgI3ve.png";
// // Import digit and separator placeholders
// import zeroImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/0-min-tPEvPN9rB1HznG7Mt67O8sK7Hooine.png";
// import oneImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/1-min-ZoIGLdKVJHxrVN9kHQaZWpcPFkxq9X.png";
// import twoImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/2-min-B3GXI5xz5WOkpenKPDeYo8yskCvJBW.png";
// import threeImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/3-min-trcxTSlqYR6ujcevBjz3K4oicnyzDz.png";
// import colonImg from "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/colon-min-YNreViOQMZBSVve4dktpfyG7IPzNpt.png";

const cat =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/smallSizedCatImageShadow-min-vfDwIcMqalDdojt4XManM6oVab8IjF.png";

// Letter assets
const fImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/f-min-ONnefclg8aEykZinPfe4TaU2mr2luL.png";
const uImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/u-min-1NrxESXwcwqBCAX3mpr1mlP8pptSPy.png";
const nImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/n-min-j6v9g9mhkvcJIn3gCXix0IWprfVipv.png";
const yImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/y-min-vsg66EfJfJ0ltYY2Glk2jOD7vKblUI.png";
const cImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/c-min-RJh0JOnJ7rLxtenkMmBileQJuTQUtF.png";
const aImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/a-min-iK2MSegZfXlLefXaSqkAaPSwHnT2YP.png";
const tImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/t-min-5zT4sVkM1w0jdfTjI4I6HEsSpqlz0I.png";
const vImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/v-min-glYqZVEjDwjc6PGYVdIaCHDupazPFN.png";
const iImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/i-min-nXs3Ss52KEycSn0ZR5ZJf62tEoUupC.png";
const dImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/d-min-TpaWLnEYjhnmA6wbme5gEgWEDt26F3.png";
const eImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/e-min-48MFLWrn9ThILAujSws79RtUEuh5GO.png";
const oImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/o-AUM5PmfrZJKW0jmNpNk6eqyzQD2qRh.png";
const mImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/m-min-HwMTmeM100CrJeWfwgIWw43ubZY7QZ.png";
const pImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/p-pbI945GclLxnYUa7Fya3OnQ0yWfPqJ.png";
const dotImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/dot-min-4lm3TPE2Y1y4nJlwwzz0gIjLoEfAP1.png";
const fourImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/4-min-awHdHnlsGsXlCf2UUZK9I9WkZgI3ve.png";

// Digit and separator placeholders
const zeroImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/0-min-tPEvPN9rB1HznG7Mt67O8sK7Hooine.png";
const oneImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/1-min-ZoIGLdKVJHxrVN9kHQaZWpcPFkxq9X.png";
const twoImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/2-min-B3GXI5xz5WOkpenKPDeYo8yskCvJBW.png";
const threeImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/3-min-trcxTSlqYR6ujcevBjz3K4oicnyzDz.png";
const colonImg =
  "https://9zjdsl5ndfyscpqh.public.blob.vercel-storage.com/colon-min-YNreViOQMZBSVve4dktpfyG7IPzNpt.png";

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
    let letterWidth = 15;
    let letterHeight = 20;
    let paddingX = 30;
    let paddingY = 30;
    let spacing = 2;

    if (renderWidth < 600) {
      letterWidth = 8;
      letterHeight = 13;
      spacing = 6;
      paddingX = 20;
      paddingY = 20;
    }

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
          startX + i * (letterWidth + spacing),
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
    const barHeight = 32;
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
    const timeWidth = 15;
    const timeHeight = 20;
    const paddingLeft = 15;
    const paddingBottom = 20;

    const timeText = "01:23";
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
