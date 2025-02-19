import { FastifyReply, FastifyRequest } from "fastify";
import svgCaptcha from "svg-captcha";
import { ObjectId } from "mongodb";

import { CaptchaModel } from "../../models/captcha.model";
import { getErrorMessage } from "../../utilities/errors";
import { replaceEscapedDoublequotes } from "../../utilities/svg";

const generateCaptchaHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    console.debug("Start request to POST /generate-captcha");
    const captcha = svgCaptcha.create({
      size: 6,
      noise: 2,
      color: false,
    });

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
    console.error({message: getErrorMessage(error)});
    return reply.code(500).send("Failed to genereate the captcha")
  }
};

export default generateCaptchaHandler;
