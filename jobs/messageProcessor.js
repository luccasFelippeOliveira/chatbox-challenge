import chatService from "../service/chatService.js";
import { getByKey } from "../store/store.js";
import { getLocalizedMessage } from "../config/messages.js";

const messageProcessor = (io) => {
  return async (job, done) => {
    try {
      // Returns some loren ipsum, it would call an service that would have some AI to respond the user.
      // calculate the number of words the incoming message has.
      const numberOfWords = job.data.data.message.split(" ").length;
      const messageRequest = {
        type: "fetch",
        data: numberOfWords,
      };
      const messageResponse = await chatService.fetchResponse(messageRequest);
      if (!messageResponse.success) {
        io.sockets.to(getByKey(job.data.data.userId)).emit("receive_message", {
          message: getLocalizedMessage("E002", "error"),
          type: "system",
          userId: "system",
        });
        return done();
      }

      const serverMessage = await chatService.createMessage({
        request: "create",
        data: {
          message: messageResponse.data,
          userId: "system",
          type: "system",
        },
      });
      io.sockets
        .to(getByKey(job.data.data.userId))
        .emit("receive_message", serverMessage);
      console.log(
        "userID = " +
          job.data.data.userId +
          "; socketID = " +
          getByKey(job.data.data.userId)
      );
      done();
    } catch (err) {
      console.log(err);
    }
  };
};

export default messageProcessor;
