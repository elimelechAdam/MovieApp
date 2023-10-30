const express = require("express");
const router = express.Router();
const userBLL = require("../BLL/loginBLL");
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username is provided and is a non-empty string
    if (!username || username.trim() === "") {
      return res.status(400).send("Username is required.");
    }

    // Check if password is provided and is a non-empty string
    if (!password || password.trim() === "") {
      return res.status(400).send("Password is required.");
    }

    const user = await userBLL.loginUser(username, password);

    // Check if user exists and credentials are correct
    if (!user) {
      return res.status(401).send("Invalid username or password.");
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
