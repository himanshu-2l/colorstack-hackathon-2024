// routes/reports.js
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const Report = require("../models/Report");
const stringSimilarity = require("string-similarity");
const router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or another service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Multer setup for file uploads (using memory storage since we're sending it to ImgBB directly)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const sendEmailNotification = async (recipientEmail, similarPosts) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Similar Lost and Found Post Alert",
    text: `A new post has been created with a title similar to yours:\n\nSimilar Posts:\n${similarPosts.join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to find similar titles
async function findSimilarTitles(newTitle) {
  try {
    const reports = await Report.find();
    const matches = reports.map((report) => ({
      title: report.title,
      description: report.description,
      similarity: stringSimilarity.compareTwoStrings(newTitle.toLowerCase(), report.title.toLowerCase()),
    }));

    // Filter matches that have more than 50% similarity
    return matches.filter((match) => match.similarity > 0.5);
  } catch (error) {
    console.error("Error finding similar titles:", error);
    return [];
  }
}

// Create a new report
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, typeOfPost, userEmail } = req.body;
    console.log("Received post request with title:", title);
    let imageUrl = null;

    // Check for similar titles before saving the new report
    const similarPosts = await findSimilarTitles(title);

    // Check if an image file is uploaded and handle the upload process
    if (req.file) {
      const imageBase64 = req.file.buffer.toString("base64");

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload`,
          `key=${process.env.IMGBB_API_KEY}&image=${encodeURIComponent(imageBase64)}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }
        );

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
      imageUrl,
    });

    await newReport.save();

    if (similarPosts.length > 0) {
      // If similar posts are found, send them along with the new report
      res.status(201).json({
        message: "Report created with similar posts found",
        newReport,
        similarPosts: similarPosts.map((post) => ({
          title: post.title,
          description: post.description
        })),
      });
    } else {
      // If no similar posts are found, just send the new report
      res.status(201).json(newReport);
    }
  } catch (error) {
    console.error("Error creating report:", error);
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

// Delete a report
router.delete("/:id", async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
});

module.exports = router;
