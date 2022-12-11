import { reduce, sort } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { inputEx, input } from "./input";
import { Item } from "./Item.model";
import { Playground } from "./Playground.model";

const monkeys = new Playground();

monkeys.init(inputEx.split(RETOUR_LIGNE + RETOUR_LIGNE));

monkeys.game(true, 20);

const result = monkeys.monkeys
  .map((m) => m.numberOperation)
  .sort(sort.numberDsc)
  .splice(0, 2)
  .reduce(reduce.product);

export default result;
