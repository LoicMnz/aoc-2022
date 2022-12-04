import { assert } from "tsafe/assert";
import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { input } from "./input";
import { parseNumber } from "core/util/type";

const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseNumber).reduce(reduce.sum, 0));
const result = Math.max(...elvesWeight);

assert(result === 73211);
export default result;
