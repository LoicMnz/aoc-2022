import { parseNumber } from "core/util/type";

export class Section {
  private start: number;
  private end: number;
  constructor(sectionLine: string) {
    const [start, end] = sectionLine.split("-").map(parseNumber);

    this.start = start;
    this.end = end;
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
