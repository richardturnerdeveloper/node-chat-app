const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', {
    from: 'Mike',
    text: 'What is going on?',
    createdAt: new Date().toString()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage')
    console.log(message);
  })

  socket.on('disconnect', (socket) => {
    console.log('Client has disconnected!');
  });
});



server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
