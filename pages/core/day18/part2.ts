import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { Drop } from "./Drop";
import { input, inputEx } from "./input";
const inp = inputEx;
const drops = inp
  .split(RETOUR_LIGNE)
  .map((l) => l.split(",").map((i) => parseNumber(i)))
  .map((l) => new Drop(l[0], l[1], l[2]));

let surfaceArea = drops.length * 6;
const isContinueDrop = (drop1: Drop, drop2: Drop) => {
  return (
    (drop1.x === drop2.x &&
      drop1.y === drop2.y &&
      (drop1.z === drop2.z + 1 || drop1.z === drop2.z - 1)) ||
    (drop1.x === drop2.x &&
      (drop1.y === drop2.y - 1 || drop1.y === drop2.y + 1) &&
      drop1.z === drop2.z) ||
    ((drop1.x === drop2.x - 1 || drop1.x == drop2.x + 1) &&
      drop1.y === drop2.y &&
      drop1.z === drop2.z)
  );
};
for (let i = 0; i < drops.length; i++) {
  const e1 = drops[i];
  for (let j = i + 1; j < drops.length; j++) {
    const e2 = drops[j];
    if (isContinueDrop(e1, e2)) {
      surfaceArea -= 2;
    }
  }
}
const dropStrings = drops.map((d) => [d.x, d.y, d.z].join(","));
const findBubbleUp = (drop: Drop, drops: Drop[]) => {
  let count = 0;
  for (let index = 0; index < drops.length; index++) {
    const element = drops[index];
    if (dropStrings.includes([drop.x, drop.y, drop.z + 1].join(","))) {
      break;
    }
    if (
      (element.x === drop.x &&
        element.y === drop.y &&
        element.z === drop.z + 2) ||
      ((element.x === drop.x - 1 || element.x === drop.x + 1) &&
        element.y === drop.y &&
        element.z === drop.z + 1) ||
      ((element.y === drop.y - 1 || element.y === drop.y + 1) &&
        element.x === drop.x &&
        element.z === drop.z + 1)
    ) {
      count++;
    }
  }
  if (count === 5) {
    const index = drops.findIndex((e) => e === drop);
    console.log(index, "one drop", drop);
    return new Drop(drop.x, drop.y, drop.z + 1);
  }
};
// 4120 too high

const bubbles = drops
  .map((d) => findBubbleUp(d, drops))
  .filter((e) => e !== undefined) as Drop[];

let continueBubble = 0;
for (let i = 0; i < bubbles.length; i++) {
  const e1 = bubbles[i];
  for (let j = i + 1; j < bubbles.length; j++) {
    const e2 = bubbles[j];
    if (isContinueDrop(e1, e2)) {
      continueBubble++;
    }
  }
}

console.log("number drops", drops.length);
console.log("initial surface", drops.length * 6);
console.log("surfaceWithContinueDrop", surfaceArea);
console.log("number bubble", bubbles.length);
console.log("number continue bubble", continueBubble);

console.log(
  "x",
  drops.reduce((c, d) => Math.min(c, d.x), Infinity),
  drops.reduce((c, d) => Math.max(c, d.x), 0),
  drops.filter((e) => e.x === 1).map((e) => e.y),
  drops.filter((e) => e.x === 1).map((e) => e.z),
  drops.filter((e) => e.x === 3).map((e) => e.y),
  drops.filter((e) => e.x === 3).map((e) => e.z)
);
console.log(
  "y",
  drops.reduce((c, d) => Math.min(c, d.y), Infinity),
  drops.reduce((c, d) => Math.max(c, d.y), 0),
  drops.filter((e) => e.y === 1).map((e) => e.x),
  drops.filter((e) => e.y === 1).map((e) => e.z),
  drops.filter((e) => e.y === 3).map((e) => e.x),
  drops.filter((e) => e.y === 3).map((e) => e.z)
);
console.log(
  "z",
  drops.reduce((c, d) => Math.min(c, d.z), Infinity),
  drops.reduce((c, d) => Math.max(c, d.z), 0),
  drops.filter((e) => e.z === 1).map((e) => e.x),
  drops.filter((e) => e.z === 1).map((e) => e.y),
  drops.filter((e) => e.z === 6).map((e) => e.x),
  drops.filter((e) => e.z === 6).map((e) => e.y)
);
surfaceArea =
  surfaceArea - continueBubble * 5 - (bubbles.length - continueBubble) * 6;
export default surfaceArea;
