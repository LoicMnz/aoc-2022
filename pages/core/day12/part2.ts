import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";

import { input, inputEx } from "./input";
import {
  PointLetter,
  PointLetterDistance,
  pointLetterSchema,
  pointsVoisins,
} from "./PointLetter";
import { operation } from "./utils";

const carte = input.split(RETOUR_LIGNE).map((line, indexLine) => {
  return line.split("").map((value, indexValue) => {
    return pointLetterSchema.parse({
      x: indexValue,
      y: indexLine,
      letter: value,
    });
  });
});
const rounds = [] as PointLetterDistance[][];
const pointsDebut: Set<PointLetter | undefined> = new Set(
  carte
    .map((l) => l.find((e) => e.letter === "S" || e.letter === "a"))
    .filter((a) => a !== undefined) || carte[0][0]
);
pointsDebut.forEach((point) => {
  const points = new Set([point]);
  const distance: PointLetterDistance[] = [];
  const pointVisites: Set<PointLetter> = new Set();

  while (points.size !== 0) {
    operation(points, carte, distance, pointVisites);
  }
  rounds.push(distance);
});

export default rounds
  .map((d) =>
    d
      .filter((p) => p.point.letter === "E")
      ?.map((e) => e.value)
      .reduce(reduce.min)
  )
  .reduce(reduce.min);
