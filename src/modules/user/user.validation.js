export const createUserSchema = {
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
    required: [ "email", "password"],
    additionalProperties: false,
};


export const updateUserSchema = {
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
    additionalProperties: false,
};
