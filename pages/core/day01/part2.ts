import { assert } from "tsafe";
import { sortNumberDsc, sumFunction } from "../util/array";
import { RETOUR_LIGNE } from "../util/constantes";
import { parseInt } from "../util/map";
import { input } from "./input";

const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseInt).reduce(sumFunction, 0));
const result = elvesWeight.sort(sortNumberDsc).slice(0, 3).reduce(sumFunction);
console.log(elvesWeight.sort(sortNumberDsc).slice(0, 3));
assert(result === 213958);
export default result;
