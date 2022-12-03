import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { input } from "./input";
import { Rucksack } from "./model/rucksack.model";

const rucksacks = input.split(RETOUR_LIGNE).map((e) => new Rucksack(e));

const result = rucksacks
  .map((rucksack) => rucksack.findCommonItem())
  .map((item) => item.getScore())
  .reduce(sumFunction);

assert(result === 8109);
export default result;
