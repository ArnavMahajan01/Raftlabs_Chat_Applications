const express = require("express");
const router = express.Router();

const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controller/chatroomController");
const { auth } = require("../middleware/auth");

router.post("/chatroom", catchErrors(chatroomController.createChatroom));
router.get(
  "/chatroomGet",
  auth,
  catchErrors(chatroomController.getAllChatrooms)
);

module.exports = router;
