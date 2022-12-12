import { assert } from "tsafe";
import { input } from "./input";
import {
  findMarkerEndIndexArrayAcc,
  findMarkerEndIndexArrayPop,
  findMarkerEndIndexArraySet,
} from "./util";

const result1 = findMarkerEndIndexArraySet(input, 14);
const result2 = findMarkerEndIndexArrayAcc(input, 14);
const result = findMarkerEndIndexArrayPop(input, 14);
assert(result === 2518);
assert(result1 === result);
assert(result2 === result);
export default result;
