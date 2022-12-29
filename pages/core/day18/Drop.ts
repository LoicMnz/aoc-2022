export class Drop {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
}
