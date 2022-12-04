export const isEmpty = (data: unknown) =>
  data === null ||
  data === undefined ||
  (typeof data === "string" && data === "") ||
  (typeof data === "object" && Object.keys(data).length === 0);
