import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { Drop } from "./Drop";
import { input, inputEx } from "./input";

const drops = input
  .split(RETOUR_LIGNE)
  .map((l) => l.split(",").map((i) => parseNumber(i)))
  .map((l) => new Drop(l[0]!, l[1]!, l[2]!));

let surfaceArea = drops.length * 6;

for (let i = 0; i < drops.length; i++) {
  const e1 = drops[i];
  for (let j = i + 1; j < drops.length; j++) {
    const e2 = drops[j];
    if (
      (e1.x === e2.x &&
        e1.y === e2.y &&
        (e1.z === e2.z + 1 || e1.z === e2.z - 1)) ||
      (e1.x === e2.x &&
        (e1.y === e2.y - 1 || e1.y === e2.y + 1) &&
        e1.z === e2.z) ||
      ((e1.x === e2.x - 1 || e1.x == e2.x + 1) &&
        e1.y === e2.y &&
        e1.z === e2.z)
    ) {
      surfaceArea -= 2;
    }
  }
}

export default surfaceArea;
