import { pointSchema, pointType } from "core/day14/cave.model";
import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { input } from "./input";
const nextValue = (s: string, sep: string) => {
  return s.split(sep)[0];
};
const distance = (a: pointType, b: pointType) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};
const serialize = (point: pointType) => {
  return point[0] + " " + point[1];
};
type Sensor = pointType;
type Beacon = pointType;
type Detect = { s: Sensor; b: Beacon; d: number };
const sensors: Detect[] = [];
input.split(RETOUR_LIGNE).map((line) => {
  const tab = line.split("=");
  const s: Sensor = [
    parseNumber(nextValue(tab[1], ",")),
    parseNumber(nextValue(tab[2], ":")),
  ];
  const b: Beacon = [parseNumber(nextValue(tab[3], ",")), parseNumber(tab[4])];
  const d = distance(s, b);
  const det = { s, b, d };
  sensors.push(det);
});

const minX = sensors.map((e) => e.s[0] - e.d).reduce(reduce.min);
const maxX = sensors.map((e) => e.s[0] + e.d).reduce(reduce.max);
const y = 2000000;
// const y = 10;
const liste = new Set<string>();

for (let index = minX; index < maxX + 1; index++) {
  const point = pointSchema.parse([index, y]);
  for (const det of sensors) {
    if (distance(det.s, point) <= det.d) {
      liste.add(serialize(point));
      break;
    }
  }
}
for (const det of sensors) {
  liste.delete(serialize(det.b));
  liste.delete(serialize(det.s));
}

export default liste.size;
