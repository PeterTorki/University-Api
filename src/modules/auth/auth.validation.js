export const signUpValidation = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        role: {
            type: "string",
            enum: ["student", "admin"]
        },
        password: { type: "string" },
        department: {
            type: "string",
            pattern: "^[a-fA-F0-9]{24}$"
        },
        enrolledCourses: {
            type: "array",
            items: { type: "string", pattern: "^[a-fA-F0-9]{24}$" }
        }
    },
    required: ["name", "email", "password"],
    additionalProperties: false,
};
export const loginValidation = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
};
