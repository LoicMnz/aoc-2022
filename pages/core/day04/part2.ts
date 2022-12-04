import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { input } from "./input";
import { Pair } from "./pair.model";
const pairs = input.split(RETOUR_LIGNE).map((pair) => new Pair(pair));

const result = pairs
  .map((pair) => pair.hasOverlap())
  .reduce(reduce.countTrue, 0);

assert(result === 900);
export default result;
