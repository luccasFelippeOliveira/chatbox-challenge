import { v4 as uuidV4 } from "uuid";
import messageModel from "../models/messageModel.js";

const chatService = {
  createUserId: () => {
    // return a userid
    return uuidV4();
  },
  createMessage: async (messageRequest) => {
    try {
      const { message, userId, type } = messageRequest.data;

      // Record message
      const newMessage = await messageModel.create({
        message,
        type,
        userId: normalizedUserId,
      });

      return {
        response: "create",
        success: true,
        data: newMessage,
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return {
          response: 'create',
          success: false,
          data: messages
        };
      } else {
        return {
          response: 'error',
          success: false,
          error: err
        }
      }
    }
  },

  fetchResponse: (fetchRequest) => {},
};
export default chatService;
