import { assert } from "tsafe";
import { crateSchema } from "core/day05/model/crate";
import { Point } from "core/day09/Point.model";
import { reduce } from "core/util/array";
import { TypeOf, z } from "zod";
import { alphabet } from "./utils";
export const pointLetterSchema = z.object({
  x: z.number(),
  y: z.number(),
  letter: z.enum(alphabet),
});

export type PointLetter = z.infer<typeof pointLetterSchema>;
export type PointLetterDistance = { point: PointLetter; value: number };
export const isOneHigher = (a: PointLetter, b: PointLetter) => {
  const aIndex = alphabet.findIndex((e) => e === a.letter);
  const bIndex = alphabet.findIndex((e) => e === b.letter);
  return aIndex === bIndex - 1 || aIndex === bIndex;
};

export const pointsVoisins = (
  a: PointLetter,
  carte: PointLetter[][],
  pointVisites: Set<PointLetter>
) => {
  const yMax = carte.length;
  const xMax = carte[0].length;
  const { x, y } = a;

  const points: PointLetter[] = [];
  if (x + 1 < xMax) {
    points.push(carte[y][x + 1]);
  }
  if (y + 1 < yMax) {
    points.push(carte[y + 1][x]);
  }
  if (x - 1 >= 0) {
    points.push(carte[y][x - 1]);
  }
  if (y - 1 >= 0) {
    points.push(carte[y - 1][x]);
  }

  const result = points
    .filter((point) => !pointVisites.has(point))
    .filter((p) => compareLetter(a.letter, p.letter) < 2);
  return result;
};

export const compareLetter = (a: string, b: string) => {
  let indexA = alphabet.findIndex((l) => l === a);
  if (a === "S") {
    indexA = alphabet.findIndex((l) => l === "a");
  }
  let indexB = alphabet.findIndex((l) => l === b);
  if (b === "E") {
    indexB = alphabet.findIndex((l) => l === "z");
  }
  return indexB - indexA;
};
