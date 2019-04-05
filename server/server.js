const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// our localhost port
const port = 3001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on("connection", socket => {
  console.log("User connected");

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on("change vote", vote => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log("Vote Changed to: ", vote);
    io.sockets.emit("change vote", vote);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// const express = require("express");
// const app = express();

// // //template engine
// // app.set("view engine", "pockerjs");

// //middlewares
// app.use(express.static("public"));

// //routes
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// server = app.listen(3000, () => {
//   "listening PORT 3000";
// });

// const io = require("socket.io")(server);
// io.on("connection", socket => {
//   console.log("New voter connected");
// });
