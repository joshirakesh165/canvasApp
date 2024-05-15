const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
// const cors = require('cors');

const app = express();
// const isDev = app.settings.env === 'development'
// const URL = 'http://localhost:4200'
// app.use(cors({origin: URL}))
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("server connected")

  socket.on('onMouseStart', (...arg) => {
    socket.broadcast.emit('onMouseStart', arg[0],arg[1])
  })

  socket.on('onMouseMove', (...arg) => {
    socket.broadcast.emit('onMouseMove', arg[0],arg[1])
  })
  socket.on('onMouseEnd',() => socket.broadcast.emit('onMouseEnd'))

  socket.on('configChange', (arg) => {
    socket.broadcast.emit('configChange',arg)
  })
});

app.use(express.static('client/browser'));

httpServer.listen(5000,() => console.log("server started at 5000"));
