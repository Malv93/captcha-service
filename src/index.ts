import fastify, { FastifyInstance } from "fastify";

import { connectToMongoDB } from "./db-config/mongodb";
import { getErrorMessage } from "./utilities/errors";
import generateCaptchaHandler from "./endpoints/generate-captcha/handler";
import { generateCaptchaSchema } from "./endpoints/generate-captcha/schema";
import validateCaptchaHandler from "./endpoints/validate-captcha/handler";
import {
  validateCaptchaSchema,
  ValidateCaptchaBody,
} from "./endpoints/validate-captcha/schema";

export function buildFastify(): FastifyInstance {
  const server = fastify();

  server.post<{ Body: ValidateCaptchaBody }>("/generate-captcha", {
    handler: generateCaptchaHandler,
    schema: generateCaptchaSchema,
  });

  server.post("/validate-captcha", {
    handler: validateCaptchaHandler,
    schema: validateCaptchaSchema,
  });
  return server;
}

const start = async (server: FastifyInstance): Promise<void> => {
  try {
    await connectToMongoDB(
      process.env.MONGODB_URI || "mongodb://localhost:27017/captcha-db"
    );
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.debug("Server running on http://localhost:3000");
  } catch (error) {
    console.error({ message: getErrorMessage(error) });
    process.exit(1);
  }
};

start(buildFastify());
