// index.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const routes = require("./routes/reports"); // Updated to match the routes file created earlier
const routes2 = require("./routes/routes");

// Connect to MongoDB using the environment variable DATABASE_URL
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

// Event listeners for database connection
database.on("error", (error) => {
  console.log("Database Connection Error:", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory

// Use routes from the reports module
app.use("/api/reports", routes);

app.use("/api/users", routes2);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
