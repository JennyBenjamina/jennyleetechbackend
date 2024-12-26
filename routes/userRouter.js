const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/User.js");

router.post("/addUser", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = new User({
      userId: uuidv4(),
      firstName,
      lastName,
    });
    await user.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save user" });
  }
});

module.exports = router;
