import mongoose, { Schema } from "mongoose";
import IUser from "../Interfaces/User.interface";
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  avater: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
export default mongoose.model<IUser>("users", userSchema);
