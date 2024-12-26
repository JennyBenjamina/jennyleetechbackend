const multer = require("multer");
const WeightData = require("../models/WeightData.js");
const { v4: uuid } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();
const { memoryStorage } = multer;

dotenv.config();
const storageMemory = memoryStorage();

const upload = multer({ storageMemory }); // using storageMemory allows for the buffer key to show up. Otherwise, it's the ObjectId

// Middleware to add metadata to the file object
async function addMetadata(req, res, next) {
  if (true) {
    const weightData = new WeightData({
      date: req.query.category,
      weight: key,
      disposition: req.query.username,
    });
    await weightData.save();
  }
  next();
}

module.exports = { upload, addMetadata };
