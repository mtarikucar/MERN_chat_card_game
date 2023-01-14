const User = require("../models/userModel");

module.exports.login = async (req, res, next) => {
  try {
    const { username, room } = req.body;
    const usernameCheck = await User.findOne({ username,room });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const user = await User.create({
      username,
      room
    });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
