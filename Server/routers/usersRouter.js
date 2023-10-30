const express = require("express");
const usersBLL = require("../BLL/usersBLL");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  const users = await usersBLL.getAllUsers();
  return res.json(users);
});
// Get user
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const user = await usersBLL.getUser(id);
  return res.json(user);
});

// Add user
router.post("/", async (req, res) => {
  console.log(req.body);
  let { fullname, username, password } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).send("Username is required.");
  }
  if (!password || password.trim() === "") {
    return res.status(400).send("Password is required.");
  }

  if (!fullname || fullname.trim() === "") {
    return res.status(400).send("Name is required.");
  }

  let status = await usersBLL.addUser(req.body);

  if (!status) {
    return res.send("Can't add user");
  }

  return res.json(status);
});

module.exports = router;
