import { assert } from "tsafe";
import { input } from "./input";
import {
  findMarkerEndIndexArrayAcc,
  findMarkerEndIndexArrayPop,
  findMarkerEndIndexArraySet,
} from "./util";

const result1 = findMarkerEndIndexArraySet(input, 4);
const result2 = findMarkerEndIndexArrayAcc(input, 4);
const result = findMarkerEndIndexArrayPop(input, 4);
assert(result === 1531);
assert(result1 === result);
assert(result2 === result);
export default result;
