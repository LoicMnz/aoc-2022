import { z } from "zod";

export const itemSchema = z.string().length(1).regex(/[A-Z]/);
export const crateSchema = z.object({ crate: z.array(itemSchema) });
export class Crate implements z.TypeOf<typeof crateSchema> {
  crate = [] as string[];

  add = (item: string) => {
    this.crate.push(item);
  };

  pop = () => {
    return this.crate.pop();
  };
  pops = (quantity: number) => {
    const acc = [] as string[];
    for (let index = 0; index < quantity; index++) {
      const item = this.pop();

      item && acc.push(item);
    }
    return acc;
  };

  nextItem = () => this.crate[this.crate.length - 1];
}

export const getCrateString = (index: number) => 4 * index + 1;
