const {
  login,
  logOut,
  roomMates,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.get("/roomMates/:id", roomMates)
router.get("/logout/:id", logOut);

module.exports = router;
