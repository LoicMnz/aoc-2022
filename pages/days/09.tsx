import Layout from "components/layout";
import { PointPrint } from "components/PointPrint";
import { Table } from "components/table";
import part1 from "core/day09/part1";
import part2 from "core/day09/part2";
import { Point } from "core/day09/Point.model";

const Day9 = () => {
  const points1: Point[] = Array.from(part1).map((e) => new Point(e));
  const points2: Point[] = Array.from(part2).map((e) => new Point(e));
  return (
    <Layout>
      <h1>Day 9</h1>
      <h2>Partie 1</h2>
      <p>{part1.size}</p>
      <PointPrint points={points1} />
      <h2>Partie 2</h2>
      <p>{part2.size}</p>
      <PointPrint points={points2} />
    </Layout>
  );
};
export default Day9;
