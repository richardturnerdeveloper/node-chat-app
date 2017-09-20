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

socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url)
  $(li).append(a);
  $('#messages').append(li);
})


$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function (){

  });

});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('NAVIGATOR NOT SUPPORTED BY THIS BROWSER!');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(e){
    alert('Unable to fetch location!');
  })
});
