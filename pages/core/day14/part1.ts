import { RETOUR_LIGNE } from "core/util/constantes";
import { parseNumber } from "core/util/type";
import { Cave, pointSchema } from "./cave.model";
import { input } from "./input";

const parseCoordonnees = (coord: string) => {
  const [x, y] = coord.split(",");
  return [parseNumber(x), parseNumber(y)];
};
const cave = new Cave();
input.split(RETOUR_LIGNE).map((line) => {
  const splitLine = line.split(" -> ");
  splitLine.forEach((coordonnees, index) => {
    if (index > 0) {
      const point1 = pointSchema.parse(
        parseCoordonnees(splitLine.at(index - 1)!)
      );
      const point2 = pointSchema.parse(parseCoordonnees(coordonnees));
      cave.addRock(point1, point2);
    }
  });
});
// while (cave.addSand()) {}

export default cave.sands.length;
