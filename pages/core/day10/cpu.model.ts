import { parseNumber } from "core/util/type";

export class CPU {
  registry: number;
  cycles: number;
  signalStrength: number[];
  crt: ("#" | ".")[][];
  constructor() {
    this.registry = 1;
    this.cycles = 0;
    this.signalStrength = [] as number[];
    this.crt = [];
  }
  addCrt(letter: "#" | ".") {
    if (this.currentCycles() !== 1) {
      this.crt.at(this.crt.length - 1)?.push(letter);
    } else {
      this.crt.push([letter]);
    }
  }
  execute(command: string) {
    const [prog, arg] = command.split(" ");
    if (prog === "noop") {
      this.increaseCycle();
    }
    if (prog === "addx") {
      this.increaseCycle();
      this.increaseCycle();
      this.registry += parseNumber(arg);
    }
  }
  currentCycles() {
    return this.cycles % 40;
  }
  increaseCycle() {
    this.cycles++;
    if (
      this.currentCycles() >= this.registry &&
      this.currentCycles() <= this.registry + 2
    ) {
      this.addCrt("#");
    } else {
      this.addCrt(".");
    }
    if ((this.cycles - 20) % 40 === 0) {
      this.addSignalStrength();
    }
  }

  addSignalStrength() {
    this.signalStrength.push(this.cycles * this.registry);
  }
}
