import { z } from "zod";

type ItemType = z.infer<typeof itemType>;
export class Item implements ItemType {
  item;
  constructor(item: string) {
    this.item = itemEnum.parse(item);
  }
  getScore = () => {
    const index = itemEnum.options.findIndex((e) => e === this.item);
    return index + 1;
  };
}

for (let index = 0; index < 5; index++) {
  const element = index;
  console.log(element + 1 / 2);
}

const scoreArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;
const itemEnum = z.enum(scoreArray);

const itemType = z.object({ item: itemEnum });
