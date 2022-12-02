import { input } from "./input";
import { calcScoreTotal } from "./util";
import { assert } from "tsafe";

const result = calcScoreTotal(input);
assert(result === 12794);
export default result;
