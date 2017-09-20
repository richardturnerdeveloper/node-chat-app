var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var response = generateMessage('Jim', 'Hello how are you?');

    expect(response.from).toBe('Jim');
    expect(response.text).toBe('Hello how are you?');
    expect(response.createdAt).toBeA('number');

  });
});

describe('generateLocationMessage', () => {
  it('should generate location message', () => {
    var response = generateLocationMessage('User', 1, 1);

    expect(response.from).toBe('User');
    expect(response.createdAt).toBeA('number');
    expect(response.url).toBe('https://www.google.com/maps?q=1,1');
  });
});
