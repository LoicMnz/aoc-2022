import Joi from "joi";

const parse = (data: unknown, option: Joi.AnySchema) =>
  Joi.attempt(data, option);
export const parseNumber = (data: unknown) =>
  parse(data, Joi.number().presence("required"));
