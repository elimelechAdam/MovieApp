const express = require("express");
const router = express.Router();
const subsBLL = require("../BLL/subsBLL");

router.post("/", async (req, res) => {
  try {
    let status = await subsBLL.addSub(req.body);

    if (!status) {
      return res.send("Can't add Sub");
    }
    return res.json(status);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    const subs = await subsBLL.getAllSubs();
    res.json(subs);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
