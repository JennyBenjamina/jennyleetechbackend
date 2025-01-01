const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const User = require("../models/User.js");

router.get("/", async (req, res) => {
  const users = await User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Failed to fetch users" });
    });
});

router.post("/addUser", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // Find the user with the highest userId
    const lastUser = await User.findOne().sort({ userId: -1 });

    // Determine the new userId
    const newUserId = lastUser ? Number(lastUser.userId) + 1 : 1;
    console.log("New userId:", newUserId);
    const user = new User({
      userId: newUserId.toString(),
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
