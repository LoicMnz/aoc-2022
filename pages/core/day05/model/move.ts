import { assert } from "tsafe";
import { parseNumber } from "core/util/type";
import { z } from "zod";
import { Crate, itemSchema } from "./crate";

export const moveSchema = z.object({
  quantity: z.number().positive(),
  from: z.number(),
  to: z.number(),
});

export class Move implements z.TypeOf<typeof moveSchema> {
  quantity;
  from;
  to;

  constructor(line: string) {
    const tab = line.split(" ");
    this.quantity = parseNumber(tab.at(1));
    const from = parseNumber(tab.at(3)) - 1;
    const to = parseNumber(tab.at(5)) - 1;

    this.from = from;
    this.to = to;
  }
}
