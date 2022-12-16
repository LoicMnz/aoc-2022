import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { input, inputEx } from "./input";

type Valve = {
  id: string;
  rate: number;
  tunnels: Valve[];
  paths: Map<Valve, number>;
};

type State = {
  time: number;
  timeConsuming: [number, number];
  flow: number;
  node: [Valve, Valve];
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

const calcFlow = (openValves: Valve[]) => {
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
const addCurrentValve = (currentValves: Valve[], ...valves: Valve[]) => {
  let result = currentValves;
  for (const v of valves) {
    if (!result.includes(v)) {
      result = [...result, v];
    }
  }
  return result;
};
const time = 26;
let maxFlow = 0;
const state: State = {
  node: [getValve("AA"), getValve("AA")],
  time,
  timeConsuming: [0, 0],
  flow: 0,
  openValves: [],
};
const queue: State[] = [state];

while (queue.length > 0) {
  const current = queue.shift()!;
  const valveAvailable: Valve[] = valves.filter(
    (v) => v.rate > 0 && !current.openValves.includes(v)
  );
  // console.log("taille openvalve", current.openValves.length);
  // condition d’arrêt tout visité
  if (valveAvailable.length === 0) {
    const flow = current.flow + current.time * calcFlow(current.openValves);
    if (flow > maxFlow) {
      console.log(flow);
      maxFlow = flow;
    }
  }
  for (const currentValveMe of valveAvailable) {
    for (const currentValveElephant of valveAvailable) {
      if (
        currentValveMe !== currentValveElephant ||
        valveAvailable.length === 1
      ) {
        const timeStepMe =
          current.node[0].paths.get(currentValveMe)! +
          1 -
          current.timeConsuming[0];
        const timeStepElephant =
          current.node[1].paths.get(currentValveElephant)! +
          1 -
          current.timeConsuming[1];
        if (timeStepMe > 0 && timeStepElephant > 0) {
          // condition d’arrêt par le temps
          if (
            current.time - timeStepMe <= 0 &&
            current.time - timeStepElephant <= 0
          ) {
            const flow =
              current.flow + current.time * calcFlow(current.openValves);
            if (flow > maxFlow) {
              maxFlow = flow;
            }
          } else if (current.time - timeStepMe <= 0) {
            // elephant opens valve, me do nothing
            queue.push({
              flow:
                current.flow + timeStepElephant * calcFlow(current.openValves),
              time: current.time - timeStepElephant,
              timeConsuming: [0, 0],
              node: [current.node[0], currentValveElephant],
              openValves: addCurrentValve(
                current.openValves,
                currentValveElephant
              ),
            });
          } else if (current.time - timeStepElephant <= 0) {
            // elephant does nothing, me open valve
            queue.push({
              flow: current.flow + timeStepMe * calcFlow(current.openValves),
              time: current.time - timeStepMe,
              timeConsuming: [0, 0],
              node: [currentValveMe, current.node[1]],
              openValves: addCurrentValve(current.openValves, currentValveMe),
            });
          } else if (timeStepElephant === timeStepMe) {
            queue.push({
              flow: current.flow + timeStepMe * calcFlow(current.openValves),
              time: current.time - timeStepMe,
              timeConsuming: [0, 0],
              node: [currentValveMe, currentValveElephant],
              openValves: addCurrentValve(
                current.openValves,
                currentValveElephant,
                currentValveMe
              ),
            });
          } else if (timeStepMe < timeStepElephant) {
            queue.push({
              flow: current.flow + timeStepMe * calcFlow(current.openValves),
              time: current.time - timeStepMe,
              timeConsuming: [0, timeStepMe + current.timeConsuming[1]],
              node: [currentValveMe, current.node[1]],
              openValves: addCurrentValve(current.openValves, currentValveMe),
            });
          } else {
            // timeStepMe > timeStepElephant
            queue.push({
              flow:
                current.flow + timeStepElephant * calcFlow(current.openValves),
              time: current.time - timeStepElephant,
              timeConsuming: [timeStepElephant + current.timeConsuming[0], 0],
              node: [current.node[0], currentValveElephant],
              openValves: addCurrentValve(
                current.openValves,
                currentValveElephant
              ),
            });
          }
        }
      }
    }
  }
}

export default maxFlow;
