const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, room } = req.body;

    const messages = await Messages.find({
      roomNumber:room
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, room, message, isConfession } = req.body;
    const data = await Messages.create({
      message: { text: message },
      roomNumber: room,
      sender: from,
      isConfession: isConfession
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports.updateVisibility = async (req, res, next) => {
  try {
    const { from, room } = req.body;

    const messages = await Messages.find({
      from: from,
      roomNumber:room,
      isConfession: true,
    }).sort({created_at: -1});

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};


