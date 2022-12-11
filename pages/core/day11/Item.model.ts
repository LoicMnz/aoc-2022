import { parseNumber } from "core/util/type";
import { assert } from "tsafe";
import { TypeOf, z } from "zod";
const operationSchema = z.enum(["+", "*"]);
const valueSchema = z.coerce.number().or(z.enum(["old"]));
export class Item {
  score: number;
  constructor(score: string) {
    this.score = parseNumber(score);
  }
  applyOperation(operation: string, divideWorry: boolean) {
    const calc = operation.split(" = ")[1];
    assert(calc !== undefined, operation);
    const calcTab = calc.split(" ");
    const right = valueSchema.parse(calcTab[0]);
    const op = operationSchema.parse(calcTab[1]);
    const left = valueSchema.parse(calcTab[2]);
    const rightValue = right === "old" ? this.score : right;
    const leftValue = left === "old" ? this.score : left;

    switch (op) {
      case "*":
        this.score = rightValue * leftValue;
        break;
      case "+":
        this.score = rightValue + leftValue;
        break;
    }
    // Get bored
    if (divideWorry) {
      this.score = Math.floor(this.score / 3);
    }
  }
}
