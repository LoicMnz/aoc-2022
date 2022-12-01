import { assert } from "tsafe/assert";
import { parseInt } from "core/util/map";
import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { input } from "./input";
const elvesWeight = input
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((e) => e.split(RETOUR_LIGNE).map(parseInt).reduce(sumFunction, 0));
const result = Math.max(...elvesWeight);

assert(result === 73211);
export default result;
