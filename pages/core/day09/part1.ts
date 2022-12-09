import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { inputEx, input } from "./input";
import { directionParse, Rope } from "./rope.model";
import { assert } from "tsafe";

const rope = new Rope(2);
input.split(RETOUR_LIGNE).forEach((ligne) => {
  const [dir, manyMoves] = ligne.split(" ");
  const direction = directionParse.parse(dir);
  const many = parseNumber(manyMoves);
  for (let index = 0; index < many; index++) {
    rope.makeMove(direction);
  }
});
assert(rope.posTail.size === 6367);
export default rope.posTail.size;
