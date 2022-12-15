import { pointType } from "core/day14/cave.model";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { Ranges, rMerge } from "ranges-merge";
import { assert } from "tsafe";
import { input } from "./input";

const max = 4000000;
const nextVal = (s: string, sep: string) => {
  return s.split(sep)[0];
};
const distance = (a: pointType, b: pointType) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const intersectionLigne = (y: number, d: Detect) => {
  if (d.s[1] + d.d >= y && y >= d.s[1] - d.d) {
    return true;
  }
  return false;
};
const getRange = (d: Detect, y: number) => {
  // const result = [d.s[0] - d.d - d.s[1] + y, d.s[0] + d.d + d.s[1] - y];
  const distanceSource = Math.abs(d.s[1] - y);
  const result = [d.s[0] - d.d + distanceSource, d.s[0] + d.d - distanceSource];

  if (result[0] < 0) {
    result[0] = 0;
  }
  return result;
};

const parcoursLigne = (sensors: Detect[], y: number): false | Ranges => {
  const dets = sensors.filter((det) => intersectionLigne(y, det));
  const merge = rMerge(
    //@ts-ignore
    dets.map((d) => getRange(d, y))
  );

  return merge?.length !== 1 && merge;
};
type Sensor = pointType;
type Beacon = pointType;
type Detect = { s: Sensor; b: Beacon; d: number };
const sensors: Detect[] = [];
input.split(RETOUR_LIGNE).map((line) => {
  const tab = line.split("=");
  const s: Sensor = [
    parseNumber(nextVal(tab[1], ",")),
    parseNumber(nextVal(tab[2], ":")),
  ];
  const b: Beacon = [parseNumber(nextVal(tab[3], ",")), parseNumber(tab[4])];
  const d = distance(s, b);
  const det = { s, b, d };
  sensors.push(det);
});

let result = -1;
// const y = 10;
for (let y = 0; y < max; y++) {
  const ranges = parcoursLigne(sensors, y);
  if (ranges) {
    const a = ranges.pop();
    const b = ranges.pop();
    assert(a !== undefined && b !== undefined);
    if (b[1] + 1 !== a[0]) {
      const x = b[1] + 1;
      result = x * 4000000 + y;
    }
  }
}

export default result;

// 10649099160102 too low
