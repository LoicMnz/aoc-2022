import { mkdirSync, readFileSync, writeFileSync } from "fs";

export const formatDay = (day: number | string) => {
  const fday = String(day).padStart(2, "0");
  return fday;
};

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimeter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export function input(): number[];
export function input(options: { split: false }): string;
export function input(options: {
  split: { delimiter?: string; mapper: false };
}): string[];
export function input(options: { split: { delimiter: string } }): number[];
export function input<T>(options: { split: SplitOptions<T> }): T[];
/**
 * Parse the input from {day}/input.txt
 * @param {SplitOptions} [split]
 */
export function input<T>({ split }: { split?: SplitOptions<T> | false } = {}) {
  const input = readFileSync(
    `./src/day${formatDay(process.env.npm_config_jour!)}/input.txt`,
    {
      encoding: "utf-8",
    }
  );

  if (split === false) return input;

  const splitted = input.split(split?.delimiter ?? "\n");
  const mapper = split?.mapper;

  return mapper === false
    ? splitted
    : splitted.map((...args) => mapper?.(...args) ?? Number(args[0]));
}
