import next from "next";
import { urlToHttpOptions } from "url";
import { z } from "zod";

export const pointSchema = z.tuple([z.number(), z.number()]);
const droiteSchema = z.tuple([pointSchema, pointSchema]);
type droiteType = z.infer<typeof droiteSchema>;
export type pointType = z.infer<typeof pointSchema>;
export class Cave {
  rocks: droiteType[];
  sands: pointType[];
  maxY: number;
  constructor() {
    this.rocks = [];
    this.sands = [];
    this.maxY = 0;
  }
  addRock(a: pointType, b: pointType) {
    if (this.maxY < a[1]) {
      this.maxY = a[1];
    }
    if (this.maxY < b[1]) {
      this.maxY = b[1];
    }
    this.rocks.push([a, b]);
  }
  isOccupy(point: pointType) {
    for (const droite of this.rocks) {
      if (isInDroite(point, droite)) {
        return true;
      }
    }
    for (const sand of this.sands) {
      if (sand[0] === point[0] && sand[1] === point[1]) {
        return true;
      }
    }

    return false;
  }
  nextPoint(point: pointType): pointType[] {
    const y = point[1] + 1;
    return [
      [point[0], y],
      [point[0] - 1, y],
      [point[0] + 1, y],
    ];
  }
  addSand() {
    let point: pointType = pointSchema.parse([500, 0]);
    let continued = true;
    while (point[1] <= this.maxY && continued) {
      let findPath = false;
      for (const iterator of this.nextPoint(point)) {
        if (!this.isOccupy(iterator)) {
          point = iterator;
          findPath = true;
          break;
        }
      }
      continued = findPath;
    }
    this.sands.push(point);
    return !continued && !(point[0] === 500 && point[1] === 0);
  }
}
function isInDroite(point: pointType, droite: droiteType) {
  const [x, y] = point;
  const [point1, point2] = droite;
  if (
    (point1[0] <= x && x <= point2[0]) ||
    (point2[0] <= x && x <= point1[0])
  ) {
    if (
      (point1[1] <= y && y <= point2[1]) ||
      (point2[1] <= y && y <= point1[1])
    ) {
      return true;
    }
  }

  return false;
}
