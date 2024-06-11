import { FunctionDescriptor, OperatorDescriptor } from "./types";

export const ERROR_CODES = {
  OPEN_PARENTHESIS: "ERR_OPEN_PARENTHESIS",
  CLOSE_PARENTHESIS: "ERR_CLOSE_PARENTHESIS",
  EXPECTED_ARG_TYPE: "ERR_EXPECTED_ARG_TYPE",
  UNEXPECTED_TOKEN_IN_ARRAY: "ERR_UNEXPECTED_TOKEN_IN_ARRAY",
  UNEXPECTED_TOKEN: "ERR_UNEXPECTED_TOKEN",
};

export const FNS: Record<string, FunctionDescriptor> = {
  ALL: {
    name: "all",
    args: ["arr"],
    description: "All participants should approve"
  },
  ANY: {
    name: "any",
    args: ["num", "arr"],
    description: "At least N participants should approve"
  },
};

export const OPS: Record<string, OperatorDescriptor> = {
  AND: {
    precedence: 1,
    value: "&&",
    description: "Logical AND",
  },
  OR: {
    precedence: 2,
    value: "||",
    description: "Logical OR",
  },
};