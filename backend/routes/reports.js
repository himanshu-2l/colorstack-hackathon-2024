// routes/reports.js
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const Report = require("../models/Report");
const router = express.Router();
require("dotenv").config();

// Multer setup for file uploads (using memory storage since we're sending it to ImgBB directly)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new report
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, typeOfPost } = req.body;
    let imageUrl = null;

    // Check if an image file is uploaded and handle the upload process
    if (req.file) {
      const imageBase64 = req.file.buffer.toString("base64");
      console.log("Image Base64:", imageBase64.substring(0, 50) + "..."); // Log the first 50 characters of the base64 string

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload`,
          `key=${process.env.IMGBB_API_KEY}&image=${encodeURIComponent(imageBase64)}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );

        console.log("ImgBB API Response:", response.data);
        imageUrl = response.data.data.url;
      } catch (imgUploadError) {
        console.error("Detailed ImgBB upload error:", imgUploadError.response ? imgUploadError.response.data : imgUploadError);
        return res.status(500).json({ message: "Error uploading image", error: imgUploadError.message });
      }
    }

    // Create new report with or without the image URL
    const newReport = new Report({
      title,
      description,
      typeOfPost,
      imageUrl, // This will be null if no image was uploaded
    });

    await newReport.save();
    res.status(201).json(newReport);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: "Error creating report", error: error.toString() });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
});

// Update report status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
});

module.exports = router;
