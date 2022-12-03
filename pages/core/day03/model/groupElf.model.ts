import { assert } from "tsafe";
export class GroupElf {
  ruckstack1: string[];
  ruckstack2: string[];
  ruckstack3: string[];
  constructor(a: string, b: string, c: string) {
    this.ruckstack1 = a.split("");
    this.ruckstack2 = b.split("");
    this.ruckstack3 = c.split("");
  }

  findCommonItem = () => {
    for (const iterator of this.ruckstack1) {
      if (
        this.ruckstack2.includes(iterator) &&
        this.ruckstack3.includes(iterator)
      ) {
        return iterator;
      }
    }
    assert(false, "should not be here");
  };
}
