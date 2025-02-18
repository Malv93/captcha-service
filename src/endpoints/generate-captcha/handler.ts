import { FastifyReply, FastifyRequest } from "fastify";
import svgCaptcha from "svg-captcha";
import { ObjectId } from "mongodb";

import { CaptchaModel } from "../../models/captcha.model";
import { getErrorMessage } from "../../utilities/errors";

const generateCaptchaHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      color: false,
    });
    console.debug("Start request to POST /generate-captcha");

    const captchaDocument = new CaptchaModel({
      data: captcha.data,
      text: captcha.text,
      createdAt: new Date().toISOString(),
    });
    const { data, _id } = (await captchaDocument.save()) as {
      data: string;
      _id: ObjectId;
    };
    console.debug({ id: _id.toString() }, "New captcha created");

    console.debug("End request to POST /generate-captcha");
    return reply.code(200).send({ svg: data, id: _id.toString() });
  } catch (error) {
    console.error({message: getErrorMessage(error)});
    return reply.code(500).send("Failed to genereate the captcha")
  }
};

export default generateCaptchaHandler;
