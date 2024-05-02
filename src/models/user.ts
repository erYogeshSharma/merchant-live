import { model, Schema, Types } from "mongoose";
import mongoose from "mongoose";
export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  profilePicUrl?: string;
  email?: string;
  password?: string;
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  authType?: "credentials" | "google";

  resetPasswordToken?: string;
  emailVerifyToken?: string;
}

const schema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    resetPasswordToken: {
      type: Schema.Types.String,
      trim: true,
    },
    emailVerifyToken: {
      type: Schema.Types.String,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: true, // allows null
      trim: true,
      select: false,
    },
    authType: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ _id: 1, status: 1 });
schema.index({ email: 1 });
schema.index({ status: 1 });

export const UserModel =
  mongoose.models.User || model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
