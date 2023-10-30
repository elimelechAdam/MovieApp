const express = require("express");
const membersBLL = require("../BLL/membersBLL");

const router = express.Router();

// Get all members
router.get("/", async (req, res) => {
  const users = await membersBLL.getAllMembers();
  return res.json(users);
});
// Get member
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  const user = await membersBLL.getMember(id);
  return res.json(user);
});

// Add member
router.post("/", async (req, res) => {
  console.log(req.body);
  let { name, email, city } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send("Name is required.");
  }
  if (!email || email.trim() === "") {
    return res.status(400).send("Email is required.");
  }

  if (!city || city.trim() === "") {
    return res.status(400).send("City is required.");
  }

  let status = await membersBLL.addMember(req.body);

  if (!status) {
    return res.send("Can't add member");
  }

  return res.json(status);
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await membersBLL.updateMember(id, obj);
    return res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await membersBLL.deleteMember(id);
  return res.json(result);
});

module.exports = router;
