const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'Welcome new user!'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server!');
  });

  socket.on('disconnect', (socket) => {
    console.log('Client has disconnected!');
  });
});



server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
