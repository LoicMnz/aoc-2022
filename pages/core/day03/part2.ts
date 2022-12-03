import { sumFunction } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { input } from "./input";
import { GroupElf } from "./model/groupElf.model";

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

const result = groups
  .map((group) => group.findCommonItem())
  .map((item) => item.getScore())
  .reduce(sumFunction);

assert(result === 2738);
export default result;
