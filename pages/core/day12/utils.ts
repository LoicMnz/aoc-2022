import { PointLetter, PointLetterDistance, pointsVoisins } from "./PointLetter";

export const alphabet = [
  "S",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "E",
] as const;

export const iteration = (
  point: PointLetter,
  carte: PointLetter[][],
  distance: PointLetterDistance[],
  pointVisites: Set<PointLetter>
) => {
  if (pointVisites.has(point)) {
    return [];
  }
  const currentDistance = distance.find((p) => p.point === point)?.value || 0;
  pointsVoisins(point, carte, pointVisites).forEach((pointVoisin) => {
    const distancePointVoisin = distance.find((p) => p.point === pointVoisin);
    if (!distancePointVoisin) {
      distance.push({ point: pointVoisin, value: currentDistance + 1 });
    } else if (currentDistance + 1 < (distancePointVoisin.value || Infinity)) {
      distancePointVoisin.value = currentDistance + 1;
    }
  });
  pointVisites.add(point);
  return pointsVoisins(point, carte, pointVisites);
};
export const operation = (
  points: Set<PointLetter | undefined>,
  carte: PointLetter[][],
  distance: PointLetterDistance[],
  pointVisites: Set<PointLetter>
) => {
  const currentPoint = points.values().next().value;
  if (currentPoint) {
    points.delete(currentPoint);
    iteration(currentPoint, carte, distance, pointVisites).forEach((e) =>
      points.add(e)
    );
  }
};
