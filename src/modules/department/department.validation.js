export const createDepartmentSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};


export const updateDepartmentSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  additionalProperties: false,
};
