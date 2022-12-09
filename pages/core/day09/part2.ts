import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { inputEx2, input, inputEx } from "./input";
import { directionParse, Rope } from "./rope.model";
import { assert } from "tsafe";

const rope = new Rope(10);
input.split(RETOUR_LIGNE).forEach((ligne) => {
  const [dir, manyMoves] = ligne.split(" ");
  const direction = directionParse.parse(dir);
  const many = parseNumber(manyMoves);
  for (let index = 0; index < many; index++) {
    rope.makeMove(direction, true);
  }
});
assert(rope.posTail.size === 2536);

export default rope.posTail.size;
