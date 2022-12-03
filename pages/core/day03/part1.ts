import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { input } from "./input";
import { PriorityItem } from "./model/priorityItems.model";

import { Rucksack } from "./model/rucksack.model";

const rucksacks = input.split(RETOUR_LIGNE).map((e) => new Rucksack(e));

const priorityItems = rucksacks
  .map((e) => e.findCommonItem())
  .map((e) => new PriorityItem(e))
  .map((e) => e.findPriority());

const result = priorityItems.reduce(sumFunction);

assert(result === 8109);
export default result;
