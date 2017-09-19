var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var response = generateMessage('Jim', 'Hello how are you?');

    expect(response.from).toBe('Jim');
    expect(response.text).toBe('Hello how are you?');
    expect(response.createdAt).toBeA('number');

  });
});
