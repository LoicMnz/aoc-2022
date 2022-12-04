import { assert } from "tsafe";
import { sort, reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";

import { input } from "./input";
import { parseNumber } from "core/util/type";

const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseNumber).reduce(reduce.sum, 0));
const result = elvesWeight.sort(sort.numberDsc).slice(0, 3).reduce(reduce.sum);
assert(result === 213958);
export default result;
