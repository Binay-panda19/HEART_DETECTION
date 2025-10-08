import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const PYTHON_API_URL = process.env.PYTHON_API_URL || "http://127.0.0.1:8000";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js backend running 🚀");
});

app.post("/api/scan", async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);
    const response = await axios.post(`${PYTHON_API_URL}/predict`, req.body);
    console.log("Received response from Python API:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error forwarding to Python API:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to get prediction from Python API" });
  }
});

app.use((req, res) => {
  console.log("Unknown request:", req.method, req.url);
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Node.js backend running on http://localhost:${PORT}`);
});
