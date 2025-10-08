import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Heart Disease Prediction Node.js Backend is running!");
});

// POST /api/scan
app.post("/api/scan", async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);

    // Forward to Python FastAPI backend
    const response = await axios.post(
      "https://heart-detection-python-ml.onrender.com",
      req.body
    );

    console.log("Received response from Python API:", response.data);

    // Return JSON to frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding to Python API:", error.message);

    res.status(500).json({
      error: "Failed to get prediction from Python API",
    });
  }
});

// Catch-all 404 middleware (place at the very end!)
app.use((req, res) => {
  console.log("Unknown request:", req.method, req.url);
  res.status(404).send("Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});
