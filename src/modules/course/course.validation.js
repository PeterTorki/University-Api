export const createCourseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    department: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$"
    },
    students: {
      type: "array",
      items: { type: "string", pattern: "^[a-fA-F0-9]{24}$" }
    }
  },
  required: ["title", "department"], 
  additionalProperties: false,
};

export const updateCourseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    department: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$"
    },
    students: {
      type: "array",
      items: { type: "string", pattern: "^[a-fA-F0-9]{24}$" }
    }
  },
  additionalProperties: false,
};
