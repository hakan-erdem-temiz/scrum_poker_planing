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

//models
let votersSelectedNumbers = [];
let voterNumer;
let stories = [];
let storyIndex = 0;

io.on("connection", function(socket) {
  console.log("User connected");

  //not relable
  //console.log(io.sockets.server.httpServer._connections); //output in number

  let interval;
  socket.on("change vote", vote => {
    console.log("Vote Changed to: ", vote);
  });

  socket.on("add story point", pointAndIndex => {
    stories[storyIndex].storyPoint = pointAndIndex.point;
    stories[storyIndex].Status = "Voted";

    votersSelectedNumbers = [];
    storyIndex++;
    io.sockets.emit("add story point", {
      point: pointAndIndex.point,
      index: storyIndex
    });
  });

  socket.on("add story", story => {
    console.log("added story to: ", story);
    stories = story;

    interval = setInterval(function() {
      console.log("story is updating every 2 second ..." + story);
      io.sockets.emit("add story", stories);
    }, 2000);

    //io.sockets.emit("add story", story);
  });

  socket.on("voters number", vnumber => {
    console.log("voters number: ", vnumber);
    voterNumer = vnumber;
    io.sockets.emit("voters number", vnumber);
  });

  socket.on("selected number", snumber => {
    console.log("selected Number:", snumber);

    votersSelectedNumbers.push(snumber);
    console.log(votersSelectedNumbers);
    console.log("length:" + votersSelectedNumbers.length);

    if (voterNumer == votersSelectedNumbers.length - 1) {
      io.sockets.emit("selected number", votersSelectedNumbers);
      console.log("All voters voted!");
      console.log(votersSelectedNumbers);
    }
  });

  socket.on("disconnect", function() {
    if (
      io.sockets.server.httpServer._connections *
        io.sockets.server.engine.clientsCount ==
      0
    ) {
      votersSelectedNumbers = [];
      storyIndex = 0;
    }
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
