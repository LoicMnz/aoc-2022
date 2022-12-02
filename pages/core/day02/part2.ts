import { assert } from "tsafe";
import { input } from "./input";
import { calcScoreTotalWithStrategy } from "./util";

const result = calcScoreTotalWithStrategy(input);
assert(result === 14979);
export default result;
