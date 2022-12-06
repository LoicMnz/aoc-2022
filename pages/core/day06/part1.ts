import { assert } from "tsafe";
import { input } from "./input";
import { findMarkerEndIndex } from "./util";

const result = findMarkerEndIndex(input, 4);
assert(result === 1531);
export default result;
