import { parseNumber } from "core/util/type";

export class File {
  size: number;

  constructor(size: string) {
    this.size = parseNumber(size);
  }

  getSize = () => this.size;
}
