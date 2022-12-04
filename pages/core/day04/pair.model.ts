import { Section } from "./section.model";

export class Pair {
  private section1: Section;
  private section2: Section;

  constructor(line: string) {
    const [section1, section2] = line.split(",").map((e) => new Section(e));
    this.section1 = section1;
    this.section2 = section2;
  }
  public hasFullyOverlap = () => {
    if (
      this.section1.fullyOverlap(this.section2) ||
      this.section2.fullyOverlap(this.section1)
    ) {
      return true;
    }
    return false;
  };
  public hasOverlap = () => {
    if (
      this.section1.overlap(this.section2) ||
      this.section2.overlap(this.section1)
    ) {
      return true;
    }
    return false;
  };
}
