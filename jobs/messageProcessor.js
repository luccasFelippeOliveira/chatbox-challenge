import chatService from "../service/chatService.js";
import { getByKey } from "../store/store.js";

const messageProcessor = (io) => {
  return async (job, done) => {
    try {
      // messages back the user.
      // Create Server message
      const jobData = job.data.data;
      const serverMessage = await chatService.createMessage({
        request: "create",
        data: { message: jobData.message, userId: "system", type: "system" },
      });
      io.sockets.to(getByKey(job.data.data.userId)).emit("receive_message", serverMessage);
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
