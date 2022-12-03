import { assert } from "tsafe";

export class Rucksack {
  private compartiment1: string;
  private compartiment2: string;
  constructor(ligne: string) {
    const tailleRucksack = ligne.length;
    const tailleCompartiment = tailleRucksack / 2;
    this.compartiment1 = ligne.slice(0, tailleCompartiment);
    this.compartiment2 = ligne.slice(tailleCompartiment, tailleRucksack);
    assert(
      tailleRucksack === this.compartiment1.length + this.compartiment2.length
    );
  }

  findCommonItem = () => {
    for (const letter of this.compartiment1.split("")) {
      if (this.compartiment2.includes(letter)) {
        return letter;
      }
    }
    assert(false, "should not be here");
  };
}
