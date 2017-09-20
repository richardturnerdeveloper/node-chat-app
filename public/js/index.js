var socket = io();

socket.on('connect', function () {
  console.log('CONNECTED TO SERVER!');

});

socket.on('disconnect', function () {
  console.log('CONNECTION DROPPED!');
});

socket.on('newMessage', function (message){
  console.log('New message:');
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});


$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function (){

  })
});
