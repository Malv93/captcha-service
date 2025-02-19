import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

import { buildFastify } from "../src/index";
import { CaptchaModel } from "../src/models/captcha.model";

describe("POST /validate-captcha", () => {
  let fastify: FastifyInstance;
  const url = "/validate-captcha";

  jest.spyOn(console, "debug").mockImplementation();
  jest.spyOn(console, "error").mockImplementation();
  jest
  .spyOn(mongoose, "connect")
  .mockImplementation();

  beforeEach(() => {
    fastify = buildFastify();
  });

  afterEach(async () => {
    await fastify.close();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should return a 200 status code if the captcha validation succeds", async () => {
    jest
      .spyOn(CaptchaModel, "findOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve({ text: "zeISGG" }));
    jest
      .spyOn(CaptchaModel, "updateOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve({ modifiedCount: 1 }));

    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d7cf",
      text: "zeISGG",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    const expectedResponseBody = { success: true };

    expect(statusCode).toStrictEqual(200);
    expect(JSON.parse(payload)).toStrictEqual(expectedResponseBody);
  });

  it("should return a 400 status code if the captcha validation fails", async () => {
    jest
      .spyOn(CaptchaModel, "findOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve({ text: "zeISGG" }));
    jest
      .spyOn(CaptchaModel, "updateOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve({ modifiedCount: 1 }));

    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d7cf",
      text: "ajxPlK",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    const expectedResponseBody = { success: false };

    expect(statusCode).toStrictEqual(400);
    expect(JSON.parse(payload)).toStrictEqual(expectedResponseBody);
  });

  it("should return a 400 status code if the request body has an invalid parameter", async () => {
    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d7cf",
      wrongParameter: "wrong",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    expect(statusCode).toStrictEqual(400);
    expect(JSON.parse(payload)).toStrictEqual({});
  });

  it("should return a 400 status code if the request body lacks a required parameter", async () => {
    const requestBody = {
      text: "ajxPlK",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    expect(statusCode).toStrictEqual(400);
    expect(JSON.parse(payload)).toStrictEqual({});
  });

  it("should return a 404 status code if the captcha does not exist or is deprecated", async () => {
    jest
      .spyOn(CaptchaModel, "findOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve(null));

    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d4ef",
      text: "zeISGG",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    expect(statusCode).toStrictEqual(404);
    expect(payload).toStrictEqual("Captcha not found");
  });

  it("should return a 500 status code error if the database throws saving the captcha", async () => {
    jest.spyOn(CaptchaModel, "findOne").mockImplementation(() => {
      throw Error("Something went wrong");
    });

    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d7cf",
      text: "ajxPlK",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    expect(statusCode).toStrictEqual(500);
    expect(payload).toStrictEqual("Failed to validate the captcha");
  });

  it("should return a 500 status code error if the database throws updating the captcha", async () => {
    jest
      .spyOn(CaptchaModel, "findOne")
      //@ts-expect-error, Accepts a value that will be returned whenever the mock function is called.
      .mockReturnValue(Promise.resolve({ text: "zeISGG" }));
    jest.spyOn(CaptchaModel, "updateOne").mockImplementation(() => {
      throw Error("Something went wrong");
    });

    const requestBody = {
      id: "67b4b46dd0fac00f1fb9d7cf",
      text: "zeISGG",
    };

    const { statusCode, payload } = await fastify.inject({
      method: "POST",
      url,
      payload: requestBody,
    });

    expect(statusCode).toStrictEqual(500);
    expect(payload).toStrictEqual("Failed to validate the captcha");
  });
});
