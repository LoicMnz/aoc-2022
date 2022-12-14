import Layout from "components/layout";
import { PointPrint, PointPrint2 } from "components/PointPrint";
import { Table } from "components/table";
import { Point } from "core/day09/Point.model";
import part1 from "core/day14/part1";
import part2, { cave } from "core/day14/part2";

const Day14 = () => {
  return (
    <Layout>
      <h1>Day 14</h1>
      <h2>Partie 1</h2>
      {part1}
      <h2>Partie 2</h2>
      {part2}
      {<PointPrint2 points={cave.sands} origine={[500, 0]} />}
    </Layout>
  );
};

export default Day14;
