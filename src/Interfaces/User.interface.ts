import { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  avater?: string;
  isActive: boolean;
}
export default IUser;
