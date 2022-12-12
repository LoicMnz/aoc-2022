import { RETOUR_LIGNE } from "core/util/constantes";

import { input, inputEx } from "./input";
import { PointLetter, pointLetterSchema, pointsVoisins } from "./PointLetter";
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
const distance: { point: PointLetter; value: number }[] = [];
const points: Set<PointLetter | undefined> = new Set(
  carte
    .map((l) => l.find((e) => e.letter === "S"))
    .filter((a) => a !== undefined)
);
const pointVisites: Set<PointLetter> = new Set();

while (points.size !== 0) {
  operation(points, carte, distance, pointVisites);
}

export default distance.find((p) => p.point.letter === "E")?.value;
