import { FastifyReply, FastifyRequest } from "fastify";

import { CaptchaModel } from "../../models/captcha.model";
import { getErrorMessage } from "../../lib/errors";
import { ValidateCaptchaBody } from "./schema";

const validateCaptchaHandler = async function (
  request: FastifyRequest<{ Body: ValidateCaptchaBody }>,
  reply: FastifyReply
): Promise<void> {
  try {
    console.debug("Start request to POST /validate-captcha");
    const { id: captchaId, text: inputText } = request.body as {
      id: string;
      text: string;
    };

    const captcha = await CaptchaModel.findOne({
      _id: captchaId,
      isDeprecated: false,
    });
    if (!captcha) {
      console.debug("Captcha not found");
      return reply.code(404).send("Captcha not found");
    }
    const { text } = captcha;

    const isSuccessful = inputText.toLowerCase() === text.toLowerCase();

    const { modifiedCount } = await CaptchaModel.updateOne(
      { _id: captchaId },
      { isDeprecated: true }
    );
    console.debug({ modifiedCount }, "Captcha deprecated");

    const statusCode = isSuccessful ? 200 : 400;

    console.debug("End request to POST /validate-captcha");
    return reply.code(statusCode).send({ success: isSuccessful });
  } catch (error) {
    console.error({ message: getErrorMessage(error) });
    return reply.code(500).send("Failed to validate the captcha");
  }
};

export default validateCaptchaHandler;
