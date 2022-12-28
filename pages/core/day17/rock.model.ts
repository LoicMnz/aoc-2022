import { RETOUR_LIGNE } from "core/util/constantes";
import { z } from "zod";
export const elementSchema = z.enum([".", "#", "@"]);
export type ElementCaveType = z.infer<typeof elementSchema>;
export type Rock = { type: ElementCaveType[][]; x: number; y: number };
const rocksInput = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`;
export const rocks: Readonly<ElementCaveType[][][]> = rocksInput
  .split(RETOUR_LIGNE + RETOUR_LIGNE)
  .map((block) => {
    return block.split(RETOUR_LIGNE).map((line) => {
      return line.split("").map((e) => elementSchema.parse(e));
    });
  });
