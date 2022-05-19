import express from "express";
import chatController from "../controllers/chatController.js";

const chats = (io) => {
  const router = express.Router();
  const controller = chatController(io);
  router
    .route("/")
    // @desc    Health check the chat api.
    // @route   GET /api/v1/chat/
    // @access  PUBLIC
    .get(controller.get)
    // @desc    Post message, if no userID is sent, create one and attach to the respose.
    // @route   POST /api/v1/chat/
    // @access  PUBLIC
    .post(controller.post);

    return router;
};

export default chats;
