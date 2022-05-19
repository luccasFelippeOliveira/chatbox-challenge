import { StatusCodes } from "http-status-codes";
import { getLocalizedMessage } from "../config/messages.js";
import chatService from "../service/chatService.js";

const chatController = (queue) => {
  return {
    get: (req, res, next) => {
      try {
        return res.status(StatusCodes.OK).json({
          success: true,
          data: getLocalizedMessage("S001", "success"),
        });
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: getLocalizedMessage("E001", "error"),
        });
      }
    },
    post: async (req, res, next) => {
      try {
        const { message, userId, type } = req.body;

        const response = await chatService.createMessage({
          request: "create",
          data: { message, userId, type },
        });

        // Send response to queue so it can be processed later.
        queue.createJob(response).save();

        if (response.response === "create" && response.success === true) {
          return res.status(StatusCodes.CREATED).json({
            success: true,
            data: response.data,
          });
        } else if (
          response.response === "create" &&
          response.success === false
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: response.data,
          });
        } else {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: getLocalizedMessage("E001", "error"),
          });
        }
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: getLocalizedMessage("E001", "error"),
        });
      }
    },

    putLike: async (req, res, next) => {
      try {
        const { messageId } = req.params;
        const likeMessageRequest = {
          request: "update",
          data: {
            messageId: messageId,
            isLike: true,
          },
        };
        const response = await chatService.likeMessage(likeMessageRequest);

        if (response.response === "update" && response.success === true) {
          return res.status(StatusCodes.OK).json({
            success: true,
            data: response.data,
          });
        } else if (
          response.response === "update" &&
          response.success === false
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: response.data,
          });
        } else {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: getLocalizedMessage("E001", "error"),
          });
        }
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: getLocalizedMessage("E001", "error"),
        });
      }
    },

    deleteLike: async (req, res, next) => {
      try {
        const { messageId } = req.params;
        const likeMessageRequest = {
          request: "update",
          data: {
            messageId: messageId,
            isLike: false,
          },
        };
        const response = await chatService.likeMessage(likeMessageRequest);

        if (response.response === "update" && response.success === true) {
          return res.status(StatusCodes.OK).json({
            success: true,
            data: response.data,
          });
        } else if (
          response.response === "update" &&
          response.success === false
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: response.data,
          });
        } else {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: getLocalizedMessage("E001", "error"),
          });
        }
      } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: getLocalizedMessage("E001", "error"),
        });
      }
    },
  };
};
export default chatController;
