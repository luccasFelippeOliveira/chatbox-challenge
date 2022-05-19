import { v4 as uuidV4 } from "uuid";
import messageModel from "../models/messageModel.js";
import axios from "axios";
import { getLocalizedMessage } from "../config/messages.js";

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
        userId: userId,
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

  fetchResponse: async (fetchRequest) => {
    if (!fetchRequest.data) {
      return {
        response: 'error',
        success: false,
      };
    }

    try {
      const response = await axios.get(process.env.MESSAGE_API_URL, {
        params: {
          type: 'word',
          length: fetchRequest.data
        }
      });

      return {
        respose: 'fetch',
        success: true,
        data: response.data.text
      };
    } catch(err) {
      return {
        respose: 'error',
        success: false,
        error: err
      }
    }
  },

  likeMessage: async (likeRequest) => {
    if (!likeRequest.data) {
      return {
        response: 'error',
        success: false,
      };
    }

    try {
      // Find message
      const message = await messageModel.findById(likeRequest.data.messageId);

      if (!message) {
        return {
          response: 'update',
          success: false,
          data: getLocalizedMessage('E002', 'error')
        }
      }

      message.like = likeRequest.data.isLike;

      const updatedMessage = await message.save();
      return {
        response: 'update',
        success: true,
        data: updatedMessage
      };
    } catch (err) {
      return {
        response: 'error',
        success: false,
        error: err
      }
    }
  }
};
export default chatService;
