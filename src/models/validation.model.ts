import mongoose, { Document, Schema } from 'mongoose';

export interface IValidation extends Document {
  successful: boolean;
  captchaId: string;
  inputText: string;
  createdAt: string;
}

const validationSchema = new Schema<IValidation>({
  successful: { type: Boolean, required: true },
  captchaId: { type: String, required: true },
  inputText: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export const ValidationModel = mongoose.model<IValidation>('Validation', validationSchema);