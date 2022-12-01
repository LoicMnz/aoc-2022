import { formatDay } from "./util";

const day = Number(process.env.npm_config_jour ?? 0);
const part = Number(process.env.npm_config_part ?? 0);
const outputSolution = (day: number, part: number) =>
  console.log(
    `Day ${day} | Part ${part} - Solution: ${
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`./day${formatDay(day)}/part${part}.js`).default
    }`
  );

const validate = (type: "day" | "part", num: number, max: number) => {
  if (num < 1 || num > max + 1)
    throw new Error(
      `The ${type} must be number between 1 and ${max}, you entered ${num}`
    );
};

validate("day", day, 25);
validate("part", part, 2);

outputSolution(day, part);
