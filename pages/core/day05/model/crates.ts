import { RETOUR_LIGNE } from "core/util/constantes";
import { z } from "zod";
import { nbCrate as nbCrates } from "../variable";
import { Crate, crateSchema, getCrateString, itemSchema } from "./crate";
import { Move, moveSchema } from "./move";

export const cratesSchema = z.object({
  crates: z.array(crateSchema).length(nbCrates),
  moves: z.array(moveSchema),
});

const craneEnum = z.enum(["9000", "9001"]);
type craneEnum = z.infer<typeof craneEnum>;
export class Crates implements z.TypeOf<typeof cratesSchema> {
  crates = [] as Crate[];
  moves = [] as Move[];

  constructor(inputCrates: string, inputMoves: string) {
    this.parseCrates(inputCrates);
    this.parseMoves(inputMoves);
  }

  getCrate(index: number) {
    const crate = this.crates[index];
    if (crate === undefined) {
      this.crates[index] = new Crate();
      return this.crates[index];
    }
    return crate;
  }
  makeMove = (move: Move, model: craneEnum) => {
    const e1 = this.getCrate(move.from);
    const e2 = this.getCrate(move.to);
    let removeItems = e1.pops(move.quantity);
    if (model === "9001") {
      removeItems = removeItems.reverse();
    }
    removeItems.forEach((e) => e2.add(e));
  };
  makeMoves = (model: craneEnum) => {
    this.moves.forEach((move) => this.makeMove(move, model));
  };

  getFirstItems = () => {
    return this.crates.map((crate) => crate.nextItem()).join("");
  };

  parseMoves = (inputMoves: string) => {
    inputMoves
      .split(RETOUR_LIGNE)
      .forEach((line) => this.moves.push(new Move(line)));
  };
  parseCrates = (inputCrates: string) => {
    inputCrates
      .split(RETOUR_LIGNE)
      .reverse()
      .forEach((ligne) => {
        for (let j = 0; j < nbCrates; j++) {
          const currentItem = itemSchema.safeParse(
            ligne.charAt(getCrateString(j))
          );
          if (currentItem.success) {
            const currentCrate = this.getCrate(j);
            currentCrate.add(currentItem.data);
          }
        }
      });
  };
}
