const validateCaptchaSchema = {
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

export default validateCaptchaSchema;
