import { parseInput } from "../util";
import { assert } from "tsafe/assert";
import { parseInt } from "../util/map";
import { sumFunction } from "../util/array";
import { RETOUR_LIGNE } from "../util/constantes";

const input = parseInput({ split: false });
const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseInt).reduce(sumFunction, 0));
const result = Math.max(...elvesWeight);

assert(result === 73211);
export default result;
