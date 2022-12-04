import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { input } from "./input";
import { Pair } from "./pair.model";
import { assert } from "tsafe";

const pairs = input.split(RETOUR_LIGNE).map((pair) => new Pair(pair));

const result = pairs
  .map((pair) => pair.hasFullyOverlap())
  .reduce(reduce.countTrue, 0);

assert(result === 542);

export default result;
