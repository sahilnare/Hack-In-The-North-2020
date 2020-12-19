
// Importing Libraries
const express = require('express');
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const useragent = require('express-useragent');
const uri = process.env.MONGO_URI;
const Users = require('./models/users.model');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());


const rooms = [];
let socketToRoom = [];
let onlineUsers = [];
io.on('connection', socket => {
    console.log(`New connection: ${socket.id}`);
    console.log("Rooms --------------------------------------------");
    rooms.forEach(room => {
      console.log(room.roomID);
      console.table(room.users);
    });
    console.log("socketToRoom");
    console.table(socketToRoom);
    console.log("onlineUsers");
    console.table(onlineUsers);

    // Add user to the onlineUsers array
    socket.on("user online", (username, id) => {
      onlineUsers.push({username, id, socketId: socket.id});
      console.table(onlineUsers);
    });

    // Get the users in a room and return the array
    socket.on("get room", (roomID) => {

      let roomInd = rooms.findIndex(room => room.roomID === roomID);
      if(roomInd > -1) {
        socket.emit("all users", rooms[roomInd].users);
      }
      else {
        socket.emit("all users", []);
      }
    });

    // Joining a room
    socket.on("join room", (username, roomID, agoraID, avatar) => {

      const userObj = {
        username: username,
        agoraID: agoraID,
        socketId: socket.id,
        avatar: avatar
      }
      // Get the room. If it exists then add user to the room or else create the room and then add user to it
      let roomInd = rooms.findIndex(room => room.roomID === roomID);
      if(roomInd > -1) {
        rooms[roomInd].users.push(userObj);
        socket.to(roomID).emit("all users", rooms[roomInd].users);
        socket.emit("all users", rooms[roomInd].users);
        socketToRoom.push({socketId: socket.id, roomInd: roomInd});
      }
      else {
        rooms.push({
          roomID: roomID,
          users: [userObj]
        });
        roomInd = rooms.length - 1;
        socket.emit("all users", rooms[roomInd].users);
        socketToRoom.push({socketId: socket.id, roomInd: roomInd});
      }
      socket.join(roomID);

      console.log("Rooms --------------------------------------------");
      rooms.forEach(room => {
        console.log(room.roomID);
        console.table(room.users);
      });
      console.log("socketToRoom");
      console.table(socketToRoom);
      console.log("onlineUsers");
      console.table(onlineUsers);
    });

    // Leaving the room
    socket.on("leave room", (roomID) => {
      // Filter out the user from the room
      let roomInd = rooms.findIndex(room => room.roomID === roomID);
      let users = rooms[roomInd].users;
      users = users.filter(user => user.socketId !== socket.id);
      rooms[roomInd].users = users;
      socket.to(roomID).emit("all users", rooms[roomInd].users);
      socket.leave(roomID);

      // Update the socketToRoom array
      let user = socketToRoom.find(user => user.socketId === socket.id);
      socketToRoom = socketToRoom.filter(user => user.socketId !== socket.id);

      console.log("Rooms --------------------------------------------");
      rooms.forEach(room => {
        console.log(room.roomID);
        console.table(room.users);
      });
      console.log("socketToRoom");
      console.table(socketToRoom);
      console.log("onlineUsers");
      console.table(onlineUsers);
    });

    // Handling disconnect event
    socket.on('disconnect', () => {

      // Remove the user from the room if they are in any
      let user = socketToRoom.find(user => user.socketId === socket.id);
      if(user) {
        let users = rooms[user.roomInd].users;
        users = users.filter(user => user.socketId !== socket.id);
        rooms[user.roomInd].users = users;
        socket.to(rooms[user.roomInd].roomID).emit("all users", rooms[user.roomInd].users);
        socketToRoom = socketToRoom.filter(user => user.socketId !== socket.id);
      }

      // Update the user to offline in database
      let userOnline = onlineUsers.find(user => user.socketId === socket.id);
      if(userOnline) {
        Users.findOneAndUpdate(
          { _id: userOnline.id },
          { isOnline: false }
        ).exec();
      }

      // Remove user from onlineUsers array
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

      console.log("Rooms --------------------------------------------");
      rooms.forEach(room => {
        console.log(room.roomID);
        console.table(room.users);
      });
      console.log("socketToRoom");
      console.table(socketToRoom);
      console.log("onlineUsers");
      console.table(onlineUsers);
    });
});


// Routes
const userAuthRouter = require('./routes/auth.js');
const queryRouter = require('./routes/userQueries.js');
const connectionRouter = require('./routes/connections.js');
app.use('/api/userAuth', userAuthRouter);
app.use('/api/userData', queryRouter);
app.use('/api/connect', connectionRouter);

// Client routes
app.use(express.static(path.join("dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join("dist", "index.html"), {root: path.join(__dirname, "..", "..")});
});


// MongoDB Setup
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
  console.log("MongoDB database connection established successfully!");
  http.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}).catch(err => console.log(err));


const connection = mongoose.connection;
connection.once("open", () => {
  const userCollection = Users.watch();

  // Check for changes in user collection
  userCollection.on("change", async (change) => {
    if(change.operationType === "update") {

      if(change.updateDescription.updatedFields.hasOwnProperty('isOnline')) {
        // If the change is in isOnline field then emit to the friends of the user about their online status
        const user = await Users.findById(change.documentKey._id, '_id isOnline friends').exec();
        console.log("Just online/offline: ", user._id);
        user.friends.forEach(friend => {
          let friInd = onlineUsers.findIndex(user => user.id == friend);
          if(friInd > -1) {
            friendSocket = onlineUsers[friInd].socketId;
            io.to(friendSocket).emit("friend online", {id: user._id, isOnline: user.isOnline});
          }
        });
      }

      if(change.updateDescription.updatedFields.hasOwnProperty('requests') || change.updateDescription.updatedFields.hasOwnProperty('pending')) {
        const user = await Users.findById(change.documentKey._id, '_id username').exec();
        console.log("connection update for: ", user.username);
        let userInd = onlineUsers.findIndex(item => item.id == user._id);
        if(userInd > -1) {
          userSocket = onlineUsers[userInd].socketId;
          io.to(userSocket).emit("connection update");
        }
      }

    }
  });
});
