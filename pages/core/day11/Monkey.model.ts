import { parseNumber } from "core/util/type";
import { assert } from "tsafe";
import { Item } from "./Item.model";

export class Monkey {
  items: Item[];
  operation: string;
  condition: number;
  ifTrue: number;
  ifFalse: number;
  numberOperation: number;
  constructor(
    lineItem: string,
    operation: string,
    condition: string,
    ifTrue: string,
    ifFalse: string
  ) {
    this.items = [];
    const items = lineItem.split(": ")[1];
    assert(items !== undefined, lineItem);
    items.split(", ").forEach((i) => {
      this.items.push(new Item(i));
    });
    this.operation = operation;
    const conditionSplit = condition.split(" ");
    this.condition = parseNumber(conditionSplit[conditionSplit.length - 1]);
    const ifTrueSplit = ifTrue.split(" ");
    this.ifTrue = parseNumber(ifTrueSplit[ifTrueSplit.length - 1]);
    const ifFalseSplit = ifFalse.split(" ");
    this.ifFalse = parseNumber(ifFalseSplit[ifFalseSplit.length - 1]);
    this.numberOperation = 0;
  }
  applyCondition(item: Item) {
    if (item.score % this.condition === 0) {
      return this.ifTrue;
    }
    return this.ifFalse;
  }
}
