import { z } from "zod";
import { input, inputEx } from "./input";

const jetSchema = z.enum(["<", ">"]);
type JetEnum = z.infer<typeof jetSchema>;

export const jets = input.split("").map((e) => jetSchema.parse(e));
