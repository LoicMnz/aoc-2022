import { z } from "zod";
import { Section, sectionType } from "./section.model";

const pairType = z.object({
  section1: sectionType,
  section2: sectionType,
});

export class Pair implements z.TypeOf<typeof pairType> {
  section1: Section;
  section2: Section;

  constructor(line: string) {
    const [section1, section2] = line.split(",").map((e) => new Section(e));
    this.section1 = section1;
    this.section2 = section2;
    z.instanceof(Pair).parse(this);
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
