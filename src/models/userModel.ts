import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  profile: {
    bio?: string;
    socialinks ?: string[];
  };
  posts: Types.ObjectId[];
};



const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email), 
      message: "Invalid email format"
    }
  },
  profile: {
    bio: {
      type: String
    },
    socialinks : {
      type: [String]
    },
  },
  posts: {
    type: [Types.ObjectId],
    ref: "Post"
  }
});

export default mongoose.model<IUser>("User", UserSchema);
