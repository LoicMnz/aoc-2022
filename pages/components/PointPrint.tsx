import { Point } from "core/day09/Point.model";
import { pointType } from "core/day14/cave.model";
import { reduce } from "core/util/array";
import { Table } from "./table";

export const PointPrint = ({ points }: { points: Point[] }) => {
  const tab = [] as string[][];
  const maxX = points.map((e) => e.x).reduce(reduce.max);
  const minX = points.map((e) => e.x).reduce(reduce.min);
  const maxY = points.map((e) => e.y).reduce(reduce.max);
  const minY = points.map((e) => e.y).reduce(reduce.min);

  for (let index = 0; index <= maxY - minY; index++) {
    tab[index] = [] as string[];
    for (let x = 0; x <= maxX - minX; x++) {
      tab[index][x] = "-";
    }
  }

  for (const iterator of points) {
    tab[iterator.y - minY][iterator.x - minX] = "#";
  }
  tab[-minY][-minX] = "0";

  return <Table tab={tab} />;
};

export const PointPrint2 = ({
  points,
  origine,
}: {
  points: pointType[];
  origine: pointType;
}) => {
  const tab = [] as string[][];
  const maxX = points.map((e) => e[0]).reduce(reduce.max);
  const minX = points.map((e) => e[0]).reduce(reduce.min);
  const maxY = points.map((e) => e[1]).reduce(reduce.max);
  const minY = points.map((e) => e[1]).reduce(reduce.min);

  for (let index = 0; index <= maxY - minY; index++) {
    tab[index] = [] as string[];
    for (let x = 0; x <= maxX - minX; x++) {
      tab[index][x] = "-";
    }
  }

  for (const iterator of points) {
    tab[iterator[1] - minY][iterator[0] - minX] = "#";
  }

  return <Table tab={tab} />;
};
