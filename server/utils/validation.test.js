const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString tests', () => {
  var nonString = isRealString(1);
  var spaceString = isRealString('    ');
  var validString = isRealString(' HELLO WORLD! ');

  it('Should reject non string values', () => {
    expect(nonString).toBe(false);
  });
  it('Should reject string with only spaces', () => {
    expect(spaceString).toBe(false);
  });
  it('Should allow string with non-space characters', () => {
    expect(validString).toBe(true);
  });
});
