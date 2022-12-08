import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { GridTree } from "./gridTree.model";
import { input } from "./input";
import { assert } from "tsafe";

const tab = input.split(RETOUR_LIGNE).map((ligne) => {
  return ligne.split("");
});
const grid = new GridTree(tab);
for (let i = 0; i < tab.length; i++) {
  const element = tab[i];
  for (let j = 0; j < element.length; j++) {
    const treeHeight = element[j];
    grid.addTree(i, j, treeHeight);
  }
}

const resultTab = grid.trees.map((ligne, i) => {
  return ligne.map((e, j) => grid.isVisible(i, j));
});

const result = resultTab
  .map((ligne) => ligne.reduce(reduce.countTrue, 0))
  .reduce(reduce.countTrue, 0);

assert(result === 1832);
export default result;
