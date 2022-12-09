import { parseNumber } from "core/util/type";

export class Point {
  x: number;
  y: number;
  constructor(point?: string) {
    const [x, y] = point?.split(",").map(parseNumber) || [];
    this.x = x || 0;
    this.y = y || 0;
  }

  serialize(): string {
    return `${this.x},${this.y}`;
  }
}
