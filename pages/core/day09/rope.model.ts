import { z } from "zod";
import { Point } from "./Point.model";

export const directionParse = z.enum(["U", "D", "R", "L"]);
type Direction = z.TypeOf<typeof directionParse>;
export class Rope {
  posTail: Set<string>;
  rope: Point[];

  constructor(numberKnot: number) {
    this.rope = [] as Point[];
    for (let index = 0; index < numberKnot; index++) {
      this.rope.push(new Point());
    }
    this.posTail = new Set();
    this.posTail.add(this.rope.at(0)?.serialize()!);
  }

  moveHead(direction: Direction) {
    const enumDirection = directionParse.parse(direction);
    const head = this.rope.at(0)!;
    switch (enumDirection) {
      case "U":
        head.y++;
        break;
      case "D":
        head.y--;
        break;
      case "R":
        head.x++;
        break;
      case "L":
        head.x--;
        break;
    }
  }
  updateRope(point1: Point, point2?: Point) {
    if (!point2) {
      return;
    }
    if (point1.x === point2.x + 2 && point1.y === point2.y + 2) {
      point2.x++;
      point2.y++;
    } else if (point1.x === point2.x - 2 && point1.y === point2.y - 2) {
      point2.x--;
      point2.y--;
    } else if (point1.x === point2.x + 2 && point1.y === point2.y - 2) {
      point2.x++;
      point2.y--;
    } else if (point1.x === point2.x - 2 && point1.y === point2.y + 2) {
      point2.x--;
      point2.y++;
    } else if (point1.y === point2.y - 2) {
      point2.x = point1.x;
      point2.y = point2.y - 1;
    } else if (point1.y === point2.y + 2) {
      point2.x = point1.x;
      point2.y = point2.y + 1;
    } else if (point1.x === point2.x - 2) {
      point2.x = point2.x - 1;
      point2.y = point1.y;
    } else if (point1.x === point2.x + 2) {
      point2.x = point2.x + 1;
      point2.y = point1.y;
    }
  }
  makeMove(direction: Direction, part2?: boolean) {
    this.moveHead(direction);
    for (let index = 0; index < this.rope.length - 1; index++) {
      const head = this.rope.at(index)!;
      const tail = this.rope.at(index + 1);
      this.updateRope(head, tail);
    }
    const lastValue = this.rope.at(this.rope.length - 1);
    this.posTail.add(lastValue?.serialize()!);
  }
}
