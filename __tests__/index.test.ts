import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

import { buildFastify } from "../src";
import { routes } from "./constants/routes";
import { start } from "../src/index";

describe("buildFastify", () => {
  let fastify: FastifyInstance;

  it("should create a fastify instance with the expected routes", async () => {
    fastify = buildFastify();
    routes.map((route) => {
      //@ts-expect-error, Accepts a non-assignable value
      expect(fastify.hasRoute(route)).toBeTruthy();
    });

    await fastify.close();
  });
});

describe("start", () => {
  let fastify: FastifyInstance;

  jest.spyOn(console, "debug").mockImplementation();
  jest.spyOn(console, "error").mockImplementation();

  beforeEach(() => {
    fastify = buildFastify();
  });

  afterEach(async () => {
    await fastify.close();
  });

  it("should start the server correctly", async () => {
    jest.spyOn(mongoose, "connect").mockImplementation();
    jest.spyOn(fastify, "listen").mockImplementation();

    await start(fastify);

    expect(mongoose.connect).toHaveBeenCalledWith(
      "mongodb://localhost:27017/captcha-db"
    );
    expect(fastify.listen).toHaveBeenCalledWith({
      port: 3000,
      host: "0.0.0.0",
    });
  });

  it("should exit if the MongoDB connection throws", async () => {
    jest.spyOn(mongoose, "connect").mockImplementation(() => {
      throw Error("MongoDB connection failed");
    });
    jest.spyOn(process, "exit").mockImplementation();

    await start(fastify);

    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should exit if the server listening throws", async () => {
    jest.spyOn(mongoose, "connect").mockImplementation();
    jest.spyOn(fastify, "listen").mockImplementation(() => {
      throw Error("Server failed to listen");
    });
    jest.spyOn(process, "exit").mockImplementation();

    await start(fastify);

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
