var socket = io();

socket.on('connect', function () {
  console.log('CONNECTED TO SERVER!');
  
});

socket.on('disconnect', function () {
  console.log('CONNECTION DROPPED!');
});

socket.on('newMessage', function (message){
  console.log('New message:');
  console.log(message);
});
