import { z } from "zod";
import { isEmpty } from "./object";

export const parseNumber = (data: unknown) => {
  if (isEmpty(data)) {
    throw Error(`Can’t convert ${data} in number`);
  }
  return z.coerce.number().parse(data);
};
