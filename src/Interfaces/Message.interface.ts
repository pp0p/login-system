import { Types } from "mongoose";
interface IMessage {
  sender: Types.ObjectId;
  message: String;
  receiver: String;
  date: Date;
}
export default IMessage;
