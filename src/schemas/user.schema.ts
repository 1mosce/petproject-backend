import { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  country_code: string;
  date_of_birth: string;
  password: string;
}

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  country_code: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date_of_birth: { type: String, required: false },
  password: { type: String, required: true },
});

// Explicitly define the model name
export const UserModelName = 'User';
