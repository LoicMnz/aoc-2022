import { reduce } from "core/util/array";
import { assert } from "tsafe";
import { Tree } from "./tree.model";

export class GridTree {
  trees: Tree[][];

  constructor(tab: string[][]) {
    this.trees = tab.map((ligne) => {
      return ligne.map((s) => new Tree(s));
    });
  }

  addTree(i: number, j: number, treeHeight: string) {
    const tree = new Tree(treeHeight);
    this.trees[i][j] = tree;
  }
  nbLigne() {
    return this.trees.length;
  }
  nbColonnes() {
    return this.trees[0].length;
  }
  isVisible(i: number, j: number) {
    const tree = this.trees.at(i)?.at(j);
    let result = false;
    assert(tree !== undefined, `${i} ${j}`);
    let localResult = true;
    for (let index = 0; index < i; index++) {
      const element = this.trees[index][j];

      assert(element !== undefined, `${index} ${j}`);
      if (tree?.height <= element.height) {
        localResult &&= false;
      }
    }
    result = result || localResult;
    localResult = true;
    for (let index = i + 1; index < this.nbLigne(); index++) {
      const element = this.trees[index][j];
      assert(element !== undefined, `${index} ${j}`);
      if (tree?.height <= element.height) {
        localResult &&= false;
      }
    }
    result = result || localResult;
    localResult = true;
    for (let index = j + 1; index < this.nbColonnes(); index++) {
      const element = this.trees[i][index];
      assert(element !== undefined, `${i} ${index}`);
      if (tree?.height <= element.height) {
        localResult &&= false;
      }
    }
    result = result || localResult;
    localResult = true;
    for (let index = 0; index < j; index++) {
      const element = this.trees[i][index];
      assert(element !== undefined, `${i} ${index}`);
      if (tree?.height <= element.height) {
        localResult &&= false;
      }
    }
    result = result || localResult;
    return result;
  }

  countVisibleTree(i: number, j: number) {
    const tree = this.trees.at(i)?.at(j);
    const result = [] as number[];
    assert(tree !== undefined, `${i} ${j}`);

    let localResult = 0;
    for (let index = i - 1; index >= 0; index--) {
      const element = this.trees[index][j];
      assert(element !== undefined, `${index} ${j}`);
      localResult += 1;
      if (element.height >= tree.height) {
        break;
      }
    }
    result.push(localResult);
    localResult = 0;

    for (let index = i + 1; index < this.nbLigne(); index++) {
      const element = this.trees[index][j];

      assert(element !== undefined, `${index} ${j}`);

      localResult += 1;
      if (element.height >= tree.height) {
        break;
      }
    }
    result.push(localResult);
    localResult = 0;

    for (let index = j + 1; index < this.nbColonnes(); index++) {
      const element = this.trees[i][index];
      assert(element !== undefined, `${i} ${index}`);

      localResult += 1;
      if (element.height >= tree.height) {
        break;
      }
    }
    result.push(localResult);

    localResult = 0;
    for (let index = j - 1; index >= 0; index--) {
      const element = this.trees[i][index];
      assert(element !== undefined, `${i} ${index}`);

      localResult += 1;
      if (element.height >= tree.height) {
        break;
      }
    }
    result.push(localResult);

    const intResult = result.reduce(reduce.product);

    return intResult;
  }
}
