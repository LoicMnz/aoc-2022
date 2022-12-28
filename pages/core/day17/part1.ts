import { assert } from "tsafe";
import { Cave } from "./cave.model";
import { jets } from "./jet.model";
import { rocks } from "./rock.model";

console.log(rocks, jets);

const caveController = new Cave();

export const oneRock = () => caveController.moveOneRock();

export const printCave = () => caveController.printCave();
caveController.movesRock();

const result = caveController.hauteur;
// const result = 0;
console.log(result);
export default result;
