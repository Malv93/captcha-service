import { FastifyInstance } from "fastify";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import svgCaptcha from "svg-captcha";

import { buildFastify } from "../src/index";
import { CaptchaModel } from "../src/models/captcha.model";

describe("POST /generate-captcha", () => {
  let fastify: FastifyInstance;
  const url = "/generate-captcha";

  jest.spyOn(console, "debug").mockImplementation();
  jest.spyOn(console, "error").mockImplementation();

  jest.spyOn(mongoose, "connect").mockImplementation();
  jest.spyOn(svgCaptcha, "create").mockImplementation(() => ({
    data: '<svg width="100" height="50" viewBox="0 0 100 50"',
    text: "PcJqtb",
  }));

  beforeEach(() => {
    fastify = buildFastify();
  });

  afterEach(async () => {
    await fastify.close();
  });

  it("should return a 200 status code and the captcha svg and id", async () => {
    jest.spyOn(CaptchaModel.prototype, "save").mockImplementation(() => ({
      svg: "<svg width='100' height='50' viewBox='0 0 100 50'>",
      _id: new ObjectId("67b4a42c82f4a701aeadaa29"),
    }));

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
    });

    const expectedResponseBody = {
      id: "67b4a42c82f4a701aeadaa29",
      svg: "<svg width='100' height='50' viewBox='0 0 100 50'>",
    };

    expect(statusCode).toStrictEqual(200);
    expect(JSON.parse(payload)).toStrictEqual(expectedResponseBody);
  });

  it("should return a 500 status code error if the database throws saving the captcha", async () => {
    jest.spyOn(CaptchaModel.prototype, "save").mockImplementation(() => {
      throw Error("Something went wrong");
    });

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
    });

    expect(statusCode).toStrictEqual(500);
    expect(payload).toStrictEqual("Failed to genereate the captcha");
  });
});
