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
  findAdjacent() {
    const adjacents: Drop[] = [];
    adjacents.push(new Drop(this.x + 1, this.y, this.z));
    adjacents.push(new Drop(this.x - 1, this.y, this.z));
    adjacents.push(new Drop(this.x, this.y + 1, this.z));
    adjacents.push(new Drop(this.x, this.y - 1, this.z));
    adjacents.push(new Drop(this.x, this.y, this.z + 1));
    adjacents.push(new Drop(this.x, this.y, this.z - 1));
    return adjacents;
  }
}
