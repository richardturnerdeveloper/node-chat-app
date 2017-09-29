var socket = io();

function scrollToBottom (){
  var messages = $('#messages');
  var newMessage= messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if (err){
      alert(err);
      window.location.href = '/';
    } else {

    }
  });
});


socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');
    users.forEach(function(user){
      ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});


socket.on('disconnect', function () {
  console.log('CONNECTION DROPPED!');
});



socket.on('newMessage', function (message){
  var formattedTime = moment(message.createdAt).format('H:mm A');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  // var li = $('<li></li>');
  // li.text(`${message.from}: ${formattedTime} ${message.text}`);
  //
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My Location</a>');
  var formattedTime = moment(message.createdAt).format('H:mm A');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();

  // li.text(`${message.from}: ${formattedTime} `);
  // a.attr('href', message.url)
  // $(li).append(a);
  // $('#messages').append(li);
});


$('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  socket.emit('createMessage', {
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
