class UserDTO {
  _id;
  username;
  email;
  posts;

  constructor(user, posts = []) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.posts = posts;
  }
}

module.exports = UserDTO