import { assert } from "tsafe";
import { inputCrates, inputMoves } from "./input";
import { Crates } from "./model/crates";

const crates = new Crates(inputCrates, inputMoves);
crates.makeMoves("9000");
const result = crates.getFirstItems();
assert(result === "TQRFCBSJJ");
export default result;
