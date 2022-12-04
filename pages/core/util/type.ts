import Joi from "joi";

const parse = <E>(data: unknown, option: Joi.AnySchema<E>) =>
  Joi.attempt(data, option);
export const parseNumber = (data: unknown) =>
  parse(data, Joi.number().presence("required"));
