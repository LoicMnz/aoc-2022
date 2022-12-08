import { parseNumber } from "core/util/type";

export class Tree {
  height: number;
  constructor(height: string) {
    this.height = parseNumber(height);
  }
}
