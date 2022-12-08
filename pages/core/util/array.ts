export const sort = {
  numberAsc: (a: number, b: number): number => a - b,
  numberDsc: (a: number, b: number): number => b - a,
};
export const reduce = {
  sum: (a: number, b: number): number => a + b,
  countTrue: (a: number, b: boolean): number => a + Number(b),
  min: (a: number, b: number): number => (a < b ? a : b),
  max: (a: number, b: number): number => (a > b ? a : b),
  product: (a: number, b: number): number => a * b,
};
