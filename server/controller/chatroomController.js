const Chatroom = require("../models/Chatroom");

exports.createChatroom = async (req, res, next) => {
  const { name } = req.body;

  if (!name) throw "Name is required";

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom can only contains alphabets";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom already exists";

  const chatroomNew = new Chatroom({
    name,
  });

  await chatroomNew.save();

  res.status(200).json({
    msg: "Chatroom created",
  });
};

exports.getAllChatrooms = async (req, res, next) => {
  const chatrooms = await Chatroom.find({});

  res.status(200).json(chatrooms);
};
