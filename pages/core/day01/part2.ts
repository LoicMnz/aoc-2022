import { assert } from "tsafe";
import { sortNumberDsc, sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseInt } from "core/util/map";
import { input } from "./input";

const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseInt).reduce(sumFunction, 0));
const result = elvesWeight.sort(sortNumberDsc).slice(0, 3).reduce(sumFunction);
assert(result === 213958);
export default result;
