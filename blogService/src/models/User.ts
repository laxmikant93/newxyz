import { Document, model, ObjectId, Schema } from 'mongoose';

const schema = new Schema(
  {
    email: String,
    userName: String,
    googleId: String,
    password: String,
    hash: String,
    token: String,
    profileImage: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  email: string,
  userName: string,
  googleId?: string,
  password: string,
  hash: string,
  token: string,
  profileImage?: string,
  isDeleted: boolean,
}

export default model<IUser>("User", schema);