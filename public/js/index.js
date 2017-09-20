var socket = io();

socket.on('connect', function () {
  console.log('CONNECTED TO SERVER!');

});

socket.on('disconnect', function () {
  console.log('CONNECTION DROPPED!');
});

socket.on('newMessage', function (message){

  var formattedTime = moment(message.createdAt).format('H:mm A');
  var li = $('<li></li>');
  li.text(`${message.from}: ${formattedTime} ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Location</a>');
  var formattedTime = moment(message.createdAt).format('H:mm A');


  li.text(`${message.from}: ${formattedTime} `);
  a.attr('href', message.url)
  $(li).append(a);
  $('#messages').append(li);
})


$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function (){
    messageTextBox.val("");
  });

});

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('NAVIGATOR NOT SUPPORTED BY THIS BROWSER!');
  }

  locationButton.attr('disabled', 'disabled').text('SENDING LOCATION...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('SEND LOCATION');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(e){
    locationButton.removeAttr('disabled').text('SEND LOCATION');
    alert('Unable to fetch location!');
  })
});
