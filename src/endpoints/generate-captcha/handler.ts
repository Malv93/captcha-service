import { FastifyReply, FastifyRequest } from "fastify";
import { ObjectId } from "mongodb";

import { CaptchaModel } from "../../models/captcha.model";
import { getErrorMessage } from "../../lib/errors";
import { createCaptcha, replaceEscapedDoublequotes } from "../../lib/captcha";

const generateCaptchaHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    console.debug("Start request to POST /generate-captcha");
    const captcha = createCaptcha();

    const captchaDocument = new CaptchaModel({
      svg: replaceEscapedDoublequotes(captcha.data),
      text: captcha.text,
      createdAt: new Date().toISOString(),
    });
    const { svg, _id } = (await captchaDocument.save()) as {
      svg: string;
      _id: ObjectId;
    };
    console.debug({ id: _id.toString() }, "New captcha created");

    console.debug("End request to POST /generate-captcha");
    return reply.code(200).send({ svg, id: _id.toString() });
  } catch (error) {
    console.error({ message: getErrorMessage(error) });
    return reply.code(500).send("Failed to genereate the captcha");
  }
};

export default generateCaptchaHandler;
