const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const WeightData = require("../models/WeightData.js");

router.get("/getWeightData", async (req, res) => {
  try {
    const weightData = await WeightData.find();
    res.status(200).json(weightData);
  } catch (error) {
    console.error("Error getting weight data:", error);
    res.status(500).json({ message: "Failed to get weight data" });
  }
});

router.post("/addWeightData", async (req, res) => {
  try {
    const { userId, weight, date, disposition } = req.body;
    console.log("console.", userId, weight, date, disposition);
    const newWeightData = new WeightData({
      userId,
      weight,
      date,
      disposition,
    });
    await newWeightData.save();
    res.status(201).json({ message: "New Weight data saved successfully!" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Failed to save New Weight data" });
  }
});

module.exports = router;
