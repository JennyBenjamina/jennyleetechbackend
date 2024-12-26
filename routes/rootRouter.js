const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const WeightData = require("../models/WeightData.js");
const User = require("../models/User.js"); // Ensure the path is correct
const { upload, addMetadata } = require("../server/database.js");

const router = express.Router();
// Convert the file URL to a path
// const __filename = fileURLToPath(import.meta.url);

// Get the directory name
// const __dirname = path.dirname(__filename);

// router.get("^/$|/index(.html)?", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../../", "frontend", "public", "index.html")
//   );
// });

router.get("/", (req, res) => {
  res.send(`Hello, ${req.subdomain}`);
});

router.post("/addData", async (req, res) => {
  try {
    const { userId, date, weight, disposition } = req.body;

    // Create a new instance of the WeightData model
    const weightData = new WeightData({
      userId,
      date,
      weight,
      disposition,
    });

    // Save the data to the database
    await weightData.save();

    res.status(201).json({ message: "Weight data saved successfully!" });
  } catch (error) {
    console.error("Error saving weight data:", error);
    res.status(500).json({ message: "Failed to save weight data" });
  }
});

// router.post(
//   "/addWeightData",
//   upload.single("file"),
//   addMetadata,
//   async (req, res) => {
//     if (req.query.username && req.query.category) {
//       const { err, key } = uploadToS3({
//         file: req.file,
//         userId: req.query.username,
//         key: req.videoKey,
//       });
//       return res.status(200).send(req.videoKey);
//     } else if (req.query.imgId) {
//       console.log("going through req.query.imgd", req.file);
//       if (req.file) {
//         const { err, key } = uploadToS3({
//           file: req.file,
//           userId: req.query.imgId,
//           key: req.imgKey,
//         });
//         return res.status(200).send(req.imgKey);
//       }
//       return res.status(200).send("No profile image uploaded.");
//     }
//     return res.status(500).send("An error occurred while uploading the file.");
//   }
// );

module.exports = router;
