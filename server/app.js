const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Message = require("./models/Message");

const errorHandler = require("./handlers/errorHandler");

dotenv.config();

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use(cors());

app.use(errorHandler.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandler.developmentErrors);
} else {
  app.use(errorHandler.productionErrors);
}

/* Initializing the path for routes */
app.use("/", require("./routes"));

/* Connected the app with mongoose */
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Connected to DB!"));

/* process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true }, */

/* Setting up server */
PORT = process.env.PORT || 6000;
const server = app.listen(PORT, function () {
  console.log("This server port is up and running at PORT: " + PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  } else {
    try {
      const payload = await jwt.verify(token, process.env.VERIFY_AUTH_TOKEN);
      socket.userId = payload.data.id;
      next();
    } catch (err) {}
  }
});

io.on("connection", (socket) => {
  console.log("connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("User joined: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("User left: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });

      io.to(chatroomId).emit("newMessage", {
        message,
        name: user.name,
        userId: socket.userId,
      });

      await newMessage.save();
    }
  });
});
