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

  //not reliable user count so i keep votersSelectedNumbers
  //console.log(io.sockets.server.httpServer._connections); //output in number

  let interval;

  // votes
  socket.on("change vote", vote => {
    console.log("Vote Changed to: ", vote);
  });

  // final point and story index
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

  //story list
  socket.on("add story", story => {
    console.log("added story to: ", story);
    stories = story;

    //story is updating every 2 second
    interval = setInterval(function() {
      console.log("story is updating every 2 second ..." + story);
      io.sockets.emit("add story", stories);
    }, 2000);

    //io.sockets.emit("add story", story);
  });

  //count of voters
  socket.on("voters number", vnumber => {
    console.log("voters number: ", vnumber);
    voterNumer = vnumber;
    io.sockets.emit("voters number", vnumber);
  });

  //selected voter number for active story
  socket.on("selected number", snumber => {
    console.log("selected Number:", snumber);

    votersSelectedNumbers.push(snumber);
    console.log(votersSelectedNumbers);
    console.log("length:" + votersSelectedNumbers.length);

    //not reliable user count so i keep votersSelectedNumbers
    if (voterNumer == votersSelectedNumbers.length - 1) {
      io.sockets.emit("selected number", votersSelectedNumbers);
      console.log("All voters voted!");
      console.log(votersSelectedNumbers);
    }
  });

  socket.on("disconnect", function() {
    //not reliable user _connections and  clientsCount
    if (
      io.sockets.server.httpServer._connections *
        io.sockets.server.engine.clientsCount ==
      0
    ) {
      votersSelectedNumbers = [];
      storyIndex = 0;
    }
    // kill story interval
    clearInterval(interval);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
