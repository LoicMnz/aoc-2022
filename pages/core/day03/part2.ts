import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { GroupElf } from "./model/groupElf.model";
import { input } from "./input";
import { PriorityItem } from "./model/priorityItems.model";

const rucksacks = input.split(RETOUR_LIGNE);
const groups: GroupElf[] = [];
for (let index = 0; index < rucksacks.length; index += 3) {
  const group = new GroupElf(
    rucksacks[index],
    rucksacks[index + 1],
    rucksacks[index + 2]
  );
  groups.push(group);
}
const commonItems = groups.map((e) => e.findCommonItem());
const result = commonItems
  .map((e) => new PriorityItem(e))
  .map((e) => e.findPriority())
  .reduce(sumFunction);

assert(result === 2738);
export default result;
