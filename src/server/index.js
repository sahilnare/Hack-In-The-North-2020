
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
const uri = process.env.MONGO_URI;


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


io.on('connection', socket => {
    console.log(`New connection: ${socket.id}`);

});


// Routes
const userAuthRouter = require('./routes/auth.js');
app.use('/api/userAuth', userAuthRouter);

// Client routes
app.use(express.static(path.join("dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join("dist", "index.html"), {root: path.join(__dirname, "..", "..")});
});


// MongoDB Setup
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}).then(() => {
  console.log("MongoDB database connection established successfully!");
  http.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
}).catch(err => console.log(err));


const connection = mongoose.connection;
