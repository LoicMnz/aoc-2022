import { RETOUR_LIGNE } from "core/util/constantes";
import { assert } from "tsafe";
import { Dir } from "./dir.model";

const CHAR_NEW_COMMAND = "$";

export const parseFile = (input: string, racineDir: Dir) => {
  let dirs = [racineDir];
  input.split(RETOUR_LIGNE).forEach((line) => {
    parseLine(line, dirs);
  });
};

const parseLine = (line: string, dirs: Dir[]) => {
  const tab = line.split(" ");
  if (tab[0] === CHAR_NEW_COMMAND) {
    if (tab[1] === "cd") {
      const arg = tab[2];
      if (arg == "..") {
        dirs.pop();
      } else if (arg === "/") {
        dirs.splice(1);
      } else {
        const changeDir = currentDir(dirs).get(arg);
        assert(changeDir !== undefined && "files" in changeDir);
        dirs.push(changeDir);
      }
    }
  } else {
    currentDir(dirs).add(line);
  }
};

const currentDir = (dirs: Dir[]) => {
  const dir = dirs.at(dirs.length - 1);
  assert(dir !== undefined);
  return dir;
};
