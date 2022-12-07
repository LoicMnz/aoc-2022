import { reduce } from "core/util/array";
import { assert } from "tsafe";
import { Dir } from "./dir.model";
import { input } from "./input";
import { parseFile } from "./utils";

const TOTAL_AVAILABLE_SPACE = 70000000;
const UPDATE_SIZE = 30000000;
const racineDir = new Dir();

parseFile(input, racineDir);

const globalSize = racineDir.getSize();
const unusedSpace = TOTAL_AVAILABLE_SPACE - globalSize;
const needClean = UPDATE_SIZE - unusedSpace;
const result = racineDir
  .recursiveGetEnoughDirToCleanSize(needClean)
  .reduce(reduce.min);

assert(result === 13210366);
export default result;
