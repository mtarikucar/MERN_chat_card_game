const User = require("../models/userModel");

module.exports.login = async (req, res, next) => {
  try {
    const { username, room } = req.body;
    const usernameCheck = await User.findOne({ username, room });
    if (usernameCheck?.isActive)
      return res.json({ msg: "Username already used", status: false });

    const user = await User.create({
      username,
      room,
    });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.roomMates = async (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });

    const roomMates = await User.find({ room: req.params.id, isActive:true });

    return res.json({ status: true, roomMates });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async (req, res, next) => {

  try {
    await User.findByIdAndUpdate( req.params.id,{
      isActive:false
    })
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
