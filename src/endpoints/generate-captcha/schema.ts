export const generateCaptchaSchema = {
  response: {
    200: {
      type: "object",
      properties: {
        svg: { type: "string" },
        id: { type: "string" },
      },
    },
    "4xx": { type: "string" },
    "5xx": { type: "string" },
  },
};
