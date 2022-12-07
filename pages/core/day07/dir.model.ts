import { assert } from "tsafe";
import { File } from "./file.model";

type ElementDir = Dir | File;
export class Dir {
  private files: Map<string, ElementDir>;
  private size: number | undefined;
  constructor() {
    this.files = new Map<string, ElementDir>();
  }

  add = (line: string) => {
    const tab = line.split(" ");
    assert(tab[0] !== undefined && tab[0] !== "$");
    if (tab[0] === "dir") {
      this.files.set(tab[1], new Dir());
    } else {
      this.files.set(tab[1], new File(tab[0]));
    }
  };

  get = (name: string) => {
    return this.files.get(name);
  };

  getSize = () => {
    if (this.size) {
      return this.size;
    }
    let size = 0;
    this.files.forEach((value, _) => {
      size += value.getSize();
    });
    this.size = size;
    return size;
  };

  getSmallSize = () => {
    const size = this.getSize();

    if (size < 100000) {
      return size + this.recursiveGetSmallSize();
    }
    return this.recursiveGetSmallSize();
  };

  isGreaterSizeThan = (size: number) => {
    return this.getSize() > size;
  };
  recursiveGetSmallSize = () => {
    let size = 0;
    this.files.forEach((value, name) => {
      if ("files" in value) {
        const smallSize = value.getSmallSize();
        size += smallSize;
      }
    });
    return size;
  };

  recursiveGetEnoughDirToCleanSize = (size: number) => {
    const sizes = [] as number[];
    this.files.forEach((value, _) => {
      if ("files" in value) {
        if (value.isGreaterSizeThan(size)) {
          sizes.push(value.getSize());
        }
        sizes.push(...value.recursiveGetEnoughDirToCleanSize(size));
      }
    });
    return sizes;
  };
}
