import { StatusCodes } from "http-status-codes";
import { getLocalizedMessage } from "../config/messages.js";
import chatService from "./service/chatService.js";

// @desc    Health check the chat api.
// @route   GET /api/v1/chat/
// @access  PUBLIC
export const getStatusCheck = (req, res, next) => {
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
};

// @desc    Post message, if no userID is sent, create one and attach to the respose.
// @route   POST /api/v1/chat/
// @access  PUBLIC
export const postMessage = async (req, res, next) => {
  try {
    const { message, userId, type } = req.body;

    const response = await chatService.createMessage({
      request: "create",
      data: { message, userId, type },
    });

    if (response.response === "create" && response.success === true) {
      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: response.data,
      });
    }

    if (response.response === "create" && response.success === false) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        data: response.data,
      });
    }

    if (response.response === "error") {
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
};
