import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { Drop } from "./Drop";
import { input, inputEx } from "./input";
const inp = input;
const drops = inp
  .split(RETOUR_LIGNE)
  .map((l) => l.split(",").map((i) => parseNumber(i)))
  .map((l) => new Drop(l[0], l[1], l[2]));
const dropsString = drops.map((e) => e.toString());
const next: Drop[] = [new Drop(0, 0, 0)];
const visited: Map<string, number> = new Map();

const minX = drops.map((e) => e.x).reduce(reduce.min);
const maxX = drops.map((e) => e.x).reduce(reduce.max);
const minY = drops.map((e) => e.y).reduce(reduce.min);
const maxY = drops.map((e) => e.y).reduce(reduce.max);
const minZ = drops.map((e) => e.z).reduce(reduce.min);
const maxZ = drops.map((e) => e.z).reduce(reduce.max);
const inGrid = (point: Drop) => {
  const { x, y, z } = point;
  if (minX - 1 > x || x > maxX + 1) {
    return false;
  }
  if (minY - 1 > y || y > maxY + 1) {
    return false;
  }
  if (minZ - 1 > z || z > maxZ + 1) {
    return false;
  }
  return true;
};
let drop: Drop;
while (next.length !== 0) {
  const drop = next.pop()!;
  const dropString = drop.toString();
  if (!inGrid(drop)) {
    console.log(drop);
    continue;
  }
  if (!dropsString.includes(dropString) && !visited.has(dropString)) {
    // how many drop neighbor
    let count = 0;
    for (let j = 0; j < drops.length; j++) {
      const e2 = drops[j];
      if (
        (drop.x === e2.x &&
          drop.y === e2.y &&
          (drop.z === e2.z + 1 || drop.z === e2.z - 1)) ||
        (drop.x === e2.x &&
          (drop.y === e2.y - 1 || drop.y === e2.y + 1) &&
          drop.z === e2.z) ||
        ((drop.x === e2.x - 1 || drop.x == e2.x + 1) &&
          drop.y === e2.y &&
          drop.z === e2.z)
      ) {
        count++;
      }
    }
    visited.set(dropString, count);

    // next step
    drop.findAdjacent().forEach((e) => next.push(e));
  }
}

console.log(visited);
let result = 0;
visited.forEach((v, k) => {
  result += v;
});

export default result;
