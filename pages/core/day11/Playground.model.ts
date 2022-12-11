import { RETOUR_LIGNE } from "core/util/constantes";
import { Monkey } from "./Monkey.model";
import { assert } from "tsafe";

const lcm = require("compute-lcm");
export class Playground {
  monkeys: Monkey[];
  ppcmConditionValue: number;
  constructor() {
    this.monkeys = [];
    this.ppcmConditionValue = 0;
  }
  init(monkeys: string[]) {
    monkeys
      .map((m) => m.split(RETOUR_LIGNE))
      .forEach((m) => {
        const itemsLine = m[1];
        const operationLine = m[2];
        const condition = m[3];
        const ifTrue = m[4];
        const ifFalse = m[5];
        this.monkeys.push(
          new Monkey(itemsLine, operationLine, condition, ifTrue, ifFalse)
        );
      });
    this.ppcmConditionValue = lcm(this.monkeys.map((m) => m.condition));
  }

  round(divideWorry: boolean) {
    for (const m of this.monkeys) {
      for (let index = 0; index < m.items.length; index++) {
        const i = m.items[index];
        i.applyOperation(m.operation, divideWorry);
        i.score = i.score % this.ppcmConditionValue;
        const newMonkeyIndex = m.applyCondition(i);
        const newMonkey = this.monkeys.at(newMonkeyIndex);
        assert(newMonkey !== undefined);
        newMonkey.items.push(i);
        m.numberOperation++;
      }
      m.items.splice(0);
    }
  }
  game(divideWorry: boolean, rounds: number) {
    for (let index = 0; index < rounds; index++) {
      this.round(divideWorry);
      if ([1, 20, 1000, 2000].includes(index)) {
        console.log(
          index,
          this.monkeys.map((m) => m.numberOperation)
        );
      }
    }
  }
}
