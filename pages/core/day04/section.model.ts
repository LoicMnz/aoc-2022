import { parseNumber } from "core/util/type";
import { z } from "zod";

export const sectionType = z.object({
  start: z.number(),
  end: z.number(),
});

type SectionType = z.TypeOf<typeof sectionType>;
export class Section implements SectionType {
  start: number;
  end: number;
  constructor(sectionLine: string) {
    const [start, end] = sectionLine.split("-").map(parseNumber);

    this.start = start;
    this.end = end;
    sectionType.parse(this);
  }

  private contain = (id: number) => {
    if (id <= this.end && id >= this.start) {
      return true;
    }
    return false;
  };
  public fullyOverlap = (section: Section) => {
    if (this.contain(section.start) && this.contain(section.end)) {
      return true;
    }
    return false;
  };
  public overlap = (section: Section) => {
    if (this.contain(section.start) || this.contain(section.end)) {
      return true;
    }
    return false;
  };
}
