import mongoose, { Document, Schema } from "mongoose";

export interface ICaptcha extends Document {
  svg: string;
  text: string;
  isDeprecated: boolean;
  createdAt: string;
}

const captchaSchema = new Schema<ICaptcha>({
  svg: { type: String, required: true },
  text: { type: String, required: true },
  isDeprecated: { type: Boolean, default: false, required: true },
  createdAt: { type: String, required: true },
});

export const CaptchaModel = mongoose.model<ICaptcha>("Captcha", captchaSchema);
