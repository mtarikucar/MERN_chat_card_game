const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  
  socket.on("room", (data) => {
    socket.join(data);
  });

  socket.on("send-msg", (data) => {
    socket.to(data.room).emit("msg-recieve", data.msg);    
  });
  

  socket.on("add-user", (data) => {
    onlineUsers.set(data._id, {id: socket.id, room: data.room});
    socket.to(data.room).emit("onlineUsers", [...onlineUsers.values()].filter(user => user.room === data.room));
    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log(onlineUsers);
    let disconnectedUser;
    onlineUsers.forEach((user, key) => {
        if(user.id === socket.id){
          disconnectedUser = user;
          return;
        }
    });
    if(disconnectedUser){
      onlineUsers.delete(disconnectedUser.id);
      socket.to(disconnectedUser.room).emit("onlineUsers", [...onlineUsers.values()].filter(user => user.room === disconnectedUser.room));
    }
    console.log(onlineUsers);
  });
});
