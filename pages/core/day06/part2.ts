import { assert } from "tsafe";
import { input } from "./input";
import { findMarkerEndIndex } from "./util";

const result = findMarkerEndIndex(input, 14);
assert(result === 2518);
export default result;
