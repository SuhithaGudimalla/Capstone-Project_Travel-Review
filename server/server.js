const exp = require("express");
const app = exp();
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Import API routes
const userApp = require("./APIs/userApi");
const authorApp = require("./APIs/authorApi");
const adminApp = require("./APIs/adminApi");

app.use(cors());

// ✅ Define port
const port = process.env.PORT || 4000;

// ✅ Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn't exist
}

// ✅ Serve uploaded images as static files
app.use("/uploads", exp.static(uploadDir));

// ✅ Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save images in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage });

// ✅ Image Upload API Route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }
  res.status(201).json({ imageUrl: `/uploads/${req.file.filename}` });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log(`✅ Server listening on port ${port}...`));
    console.log("✅ DB connection success");
  })
  .catch((err) => {
    console.error("❌ Error in DB connection:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// ✅ Middleware
app.use(exp.json()); // Body parser

// ✅ API Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error in Express Error Handler:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

