import { assert } from "tsafe";
import { Dir } from "./dir.model";
import { input } from "./input";
import { parseFile } from "./utils";

const racineDir = new Dir();

parseFile(input, racineDir);

const result = racineDir.recursiveGetSmallSize();
assert(result === 1306611);
export default result;
