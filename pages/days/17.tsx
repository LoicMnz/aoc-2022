import Layout from "components/layout";
import part1, { oneRock, printCave } from "core/day17/part1";
import part2 from "core/day17/part2";
import { Table } from "components/table";
import { RETOUR_LIGNE } from "core/util/constantes";
import { useState } from "react";
import { rocks } from "core/day17/rock.model";
import { nextJetIndex, nextRockIndex } from "core/day17/cave.model";
import { jets } from "core/day17/jet.model";

const Day17 = () => {
  const [cave, setCave] = useState([""]);
  const onClick = () => {
    oneRock();
    setCave(printCave());
  };
  const nextJets = [...jets].splice(nextJetIndex % jets.length, 10);
  return (
    <Layout>
      <h1>Day 17</h1>
      <h2>Partie 1</h2>
      <p>next step</p>
      <pre>
        {rocks[(nextRockIndex - 1) % rocks.length]
          ?.map((l) => l.join(""))
          .join(RETOUR_LIGNE)}
      </pre>
      <p>next move</p>
      <pre>{nextJets.join(" ")}</pre>
      <p>Cave</p>
      <pre>
        {[
          ...rocks[(nextRockIndex - 1) % rocks.length]?.map(
            (l) => `..${l.join("")}`
          ),
          ".......",
          ".......",
          ".......",
          ...cave,
        ].join(RETOUR_LIGNE)}
      </pre>
      <button onClick={onClick}>One</button>
      {part1}
      <h2>Partie 2</h2>
      {part2}
    </Layout>
  );
};

export default Day17;
