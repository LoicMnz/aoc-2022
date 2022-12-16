import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { assert } from "tsafe";
import { isKeyObject } from "util/types";
import { input, inputEx } from "./input";

type Valve = {
  id: string;
  rate: number;
  tunnels: Valve[];
  paths: Map<Valve, number>;
};

type State = {
  time: number;
  flow: number;
  node: Valve;
  openValves: Valve[];
};

const valves: Valve[] = [];
const getValve = (id: string) => {
  let valve;
  if ((valve = valves.find((v) => v.id === id))) {
    return valve;
  }
  valve = {
    id,
    rate: -1,
    tunnels: [],
    paths: new Map<Valve, number>(),
  };
  valves.push(valve);
  return valve;
};

// parsing input

const bfs = (valve: Valve) => {
  const queue: Valve[] = [];
  const explored = new Set<Valve>();
  explored.add(valve);
  queue.push(valve);
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const v of current?.tunnels!) {
      if (!explored.has(v)) {
        explored.add(v);
        valve.paths.set(v, (valve.paths.get(current) || 0) + 1);
        queue.push(v);
      }
    }
  }
};

const calcRate = (openValves: Valve[]) => {
  return openValves.map((v) => v.rate).reduce(reduce.sum, 0);
};
input.split(RETOUR_LIGNE).map((line) => {
  const id = line.split(" ")[1];
  const rate = line.split("=")[1]?.split(";")[0];
  const link = line.split(";")[1]?.split(" ")?.splice(5)?.join("").split(",");
  const valve = getValve(id);
  valve.rate = parseNumber(rate);
  valve.tunnels = link?.map((id) => getValve(id));
});

valves.forEach((v, k) => {
  bfs(v);
});

const time = 30;
let maxFlow = 0;
const state: State = {
  node: getValve("AA"),
  time,
  flow: 0,
  openValves: [],
};
const queue: State[] = [state];

while (queue.length > 0) {
  const current = queue.shift()!;
  const valveAvailable: Valve[] = valves.filter(
    (v) => v.rate > 0 && !current.openValves.includes(v)
  );
  // condition d’arrêt tout visité
  if (valveAvailable.length === 0) {
    const flow = current.flow + current.time * calcRate(current.openValves);
    if (flow > maxFlow) {
      maxFlow = flow;
    }
  }
  for (const currentValve of valveAvailable) {
    const timeStep = current.node.paths.get(currentValve)! + 1;
    // condition d’arrêt par le temps
    if (current.time - timeStep <= 0) {
      const flow = current.flow + current.time * calcRate(current.openValves);
      if (flow > maxFlow) {
        maxFlow = flow;
      }
    } else {
      queue.push({
        flow: current.flow + timeStep * calcRate(current.openValves),
        time: current.time - timeStep,
        node: currentValve,
        openValves: [...current.openValves, currentValve],
      });
    }
  }
}

export default maxFlow;
