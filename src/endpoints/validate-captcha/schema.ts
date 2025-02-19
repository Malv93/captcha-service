export interface ValidateCaptchaBody {
  id: string;
  text: string;
}

export const validateCaptchaSchema = {
  body: {
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[0-9a-z]{24}$",
        description: "An id string that can be converted in a MongoDB ObjectID"
      },
      text: { type: "string" },
    },
    required: ["id", "text"],
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { const: true },
      },
    },
    400: {
      type: "object",
      properties: {
        success: { const: false },
      },
    },
    "4xx": { type: "string" },
    "5xx": { type: "string" },
  },
};