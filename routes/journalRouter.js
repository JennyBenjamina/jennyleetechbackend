const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal.js");

router.get("/", async (req, res) => {
  try {
    // Fetch journals sorted by `createdAt` in descending order
    const journals = await Journal.find().sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (err) {
    console.error("Error fetching Journals:", err);
    res.status(500).json({ message: "Failed to fetch Journals" });
  }
});

// Route to fetch a specific journal by journalId
router.get("/:journalId", async (req, res) => {
  try {
    const { journalId } = req.params; // Extract the journalId from the URL params
    console.log(journalId);
    // Find the journal with the matching journalId
    const journal = await Journal.findOne({ journalId: journalId });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.status(200).json(journal); // Return the found journal
  } catch (error) {
    console.error("Error fetching Journal:", error);
    res.status(500).json({ message: "Failed to fetch Journal" });
  }
});

router.post("/addJournal", async (req, res) => {
  try {
    const { journalId, title, content, category, tags, createdAt, updatedAt } =
      req.body;

    // Find the Journal with the highest JournalId
    const lastJournal = await Journal.findOne().sort({ journalId: -1 }); // Sort by JournalId descending
    console.log("Last Journal:", lastJournal);
    const newJournalId = lastJournal ? Number(lastJournal.journalId) + 1 : 1; // Increment JournalId or start at 1

    // Create a new Journal entry
    const newJournal = new Journal({
      journalId: newJournalId.toString(), // Ensure JournalId is a string
      title,
      content,
      category,
      tags,
      createdAt: createdAt || new Date(), // Use current date if not provided
      updatedAt: updatedAt || new Date(), // Use current date if not provided
    });

    // Save the new Journal
    await newJournal.save();

    res
      .status(201)
      .json({ message: "Journal saved successfully!", journal: newJournal });
  } catch (error) {
    console.error("Error saving Journal:", error);
    res.status(500).json({ message: "Failed to save Journal" });
  }
});

module.exports = router;
