import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    user: String,
    message: String,
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
