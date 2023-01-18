const { addMessage, getMessages, updateVisibility } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.post("/changeVisibity/", updateVisibility);

module.exports = router;
