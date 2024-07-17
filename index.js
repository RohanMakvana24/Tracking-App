const express = require("express");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const http = require("http");
dotenv.config();
//server setup
const port = process.env.PORT;
const exp = express();
const server = http.createServer(exp);

exp.get("/", (req, res) => {
  res.render("index");
});
//socketio
const io = socketio(server);
exp.use(express.static("public"));
exp.set("view engine", "ejs");

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    console.log(data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    console.log("oks");
    io.emit("user-disconnected", socket.id);
  });
  console.log("Conected");
});

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
