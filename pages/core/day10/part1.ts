import { reduce } from "core/util/array";
import { RETOUR_LIGNE } from "core/util/constantes";
import { CPU } from "./cpu.model";
import { inputEx, input } from "./input";

const cpu = new CPU();
input.split(RETOUR_LIGNE).forEach((line) => {
  cpu.execute(line);
});

export default cpu.signalStrength.reduce(reduce.sum);
