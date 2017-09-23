const expect = require('expect');
const {Users} = require('./users');

describe('User class test cases', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Bill',
      room: 'React Course'
    },
    {
      id: '3',
      name: 'Ken',
      room: 'Node Course'
    }]
  });


  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Travis',
      room: 'Big Boys'
    };
    var responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it ('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Ken']);
  });
  it ('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Bill']);
  });

  it('should remove a user', () => {
    var user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user', () => {
    var user = users.removeUser('4');
    expect(user).toNotExist();
  });
  it('should find user', () => {
    var foundUser = users.getUser('1');
    expect(foundUser.name).toEqual('Mike');
  });
  it('should not find user', () => {
    var foundUser = users.getUser('4');
    expect(foundUser).toNotExist();
  })
});
