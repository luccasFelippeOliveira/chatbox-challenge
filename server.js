import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import chats from "./routes/chats.js";
import connectDatabase from "./config/database.js";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
import chatService from "./service/chatService.js";
import { removeKey, setByKey, getByKey } from "./store/store.js";
import messageProcessor from "./jobs/messageProcessor.js";
import BeeQueue from "bee-queue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

dotenv.config({ path: "./config/config.env" });

await connectDatabase();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT ?? 5000;

const httpserver = http.createServer(app);
const io = new Server(httpserver);
const options = {
  removeOnSuccess: true,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  }
};
const queue = new BeeQueue('messageQueue', options);
queue.process(messageProcessor(io));

app.use("/api/v1/chat", chats(queue));

httpserver.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});

io.on("connection", (socket) => {
  const userId = chatService.createUserId();
  socket.emit("receive_user_id", userId);
  console.log("Client connected with userId " + userId);
  setByKey(userId, socket.id);

  // Attach userID to socket.
  socket.userId = userId;

  socket.on("disconnect", () => {
    console.log("A client has disconnected with userID = " + socket.userId);
    removeKey(socket.userId);
  });
});
