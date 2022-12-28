import { jets } from "./jet.model";
import { ElementCaveType, Rock, rocks } from "./rock.model";

const lengthCave = 7;
export let nextJetIndex = 0;
export let nextRockIndex = 0;
let nbRock = 0;
let nbIteration = 1000_000_000_000;
export class Cave {
  cave: ElementCaveType[][];
  currentRock: Rock;
  hauteur = 0;
  hash = new Map<string, number[]>();
  constructor() {
    this.cave = [Array.from({ length: lengthCave }, () => "#")];
    this.currentRock = this.newRock();
    console.log("controler");
  }
  printCave() {
    console.log(this.cave.length);
    return [...this.cave].reverse().map((l) => l.join(""));
  }
  newRock = () => {
    const rock = {
      type: rocks[nextRockIndex++ % rocks.length],
      x: 2,
      y: this.cave.length + 3,
    };

    return rock;
  };
  intersectionCurrentRock = () => {
    const { type, x, y } = this.currentRock;
    for (let i = 0; i < type.length; i++) {
      const line = type[i];
      for (let j = 0; j < line?.length || 0; j++) {
        const element = line[j];
        const currentY = type.length - i + y - 1;
        if (
          this.cave[currentY - 1] &&
          element === "#" &&
          this.cave[currentY - 1][j + x] === "#"
        ) {
          return true;
        }
      }
    }
    return false;
  };
  restRock = (): void => {
    const { type, x, y } = this.currentRock!;

    for (let i = 0; i < type.length; i++) {
      const line = type[i];
      const currentY = y + type.length - i - 1;
      if (!this.cave[currentY]) {
        this.hauteur++;
        this.cave[currentY] = Array.from({ length: lengthCave }, () => ".");
      }
      for (let j = 0; j < line?.length; j++) {
        const element = line[j];
        if (element === "#") {
          this.cave[currentY][j + x] = "#";
        }
      }
    }

    // simplify cave
    this.simplifyCave();
    this.currentRock = this.newRock();
    nbRock++;
  };
  getNextJet = () => {
    const jet = jets[nextJetIndex++ % jets.length];

    return jet;
  };
  makeOneStep = () => {
    const jet = this.getNextJet();
    let possible = false;
    const rock = this.currentRock.type;
    switch (jet) {
      case "<":
        possible = this.currentRock.x > 0;
        for (let i = 0; i < rock.length; i++) {
          for (let j = 0; j < rock[i].length; j++) {
            const currentY = this.currentRock.y + rock.length - i - 1;
            const currentX = this.currentRock.x + j;
            if (rock[i][j] === "#") {
              possible &&=
                !this.cave[currentY] ||
                this.cave[currentY][currentX - 1] === ".";
            }
          }
        }
        possible && this.currentRock.x--;
        break;
      case ">":
        possible =
          this.currentRock.x + this.currentRock.type[0].length < lengthCave;
        for (let i = 0; i < rock.length; i++) {
          for (let j = 0; j < rock[i].length; j++) {
            const currentY = this.currentRock.y + rock.length - i - 1;
            const currentX = this.currentRock.x + j;
            if (rock[i][j] === "#") {
              possible &&=
                !this.cave[currentY] ||
                this.cave[currentY][currentX + 1] === ".";
            }
          }
        }
        possible && this.currentRock.x++;
        break;
    }
    // condition d’arrêt
    if (this.intersectionCurrentRock()) {
      this.restRock();
      return;
    }
    this.currentRock.y--;
  };
  simplifyCave = () => {
    if (this.cave.length > 2000) {
      this.cave = this.cave.splice(this.cave.length - 2000);
    }
  };
  moveOneRock = () => {
    const current = nbRock;
    while (current === nbRock) {
      this.makeOneStep();
    }
    this.findPattern();
  };
  movesRock = () => {
    console.time("rocks");
    while (nbRock < nbIteration) {
      // 1000_000_000_000
      this.moveOneRock();
    }
    console.timeEnd("rocks");
  };
  findPattern = () => {
    const nextJet = nextJetIndex;
    const nextRock = nextRockIndex;
    const firstItemCave = [];

    for (let index = 0; index < lengthCave; index++) {
      let hauteur = 1;
      let element = this.cave[this.cave.length - hauteur][index];
      while (element !== "#") {
        hauteur += 1;
        element = this.cave[this.cave.length - hauteur][index];
      }
      firstItemCave.push(hauteur);
    }
    const hash = [
      nextJet % jets.length,
      nextRock % rocks.length,
      ...firstItemCave,
    ].join(" ");
    if (this.hash.has(hash)) {
      const [lastNbRock, lastHauteur] = this.hash.get(hash)!;
      const step = nbRock - lastNbRock;
      const diff = this.hauteur - lastHauteur;
      const division = Math.floor((nbIteration - nbRock) / step);

      console.log({ diff }, { division }, { step });
      nbRock += division * step;
      this.hauteur += diff * division;
      this.hash.clear();
      console.log(this.hauteur, nbRock);
    }

    this.hash.set(hash, [nbRock, this.hauteur]);
  };
}
