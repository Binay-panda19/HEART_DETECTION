import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const PYTHON_API_URL = process.env.PYTHON_API_URL;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js backend running 🚀");
});

app.post("/api/scan", async (req, res) => {
  try {
    console.log("Received data from frontend:", req.body);
    // console.log(PYTHON_API_URL);
    // console.log("➡️ Sending POST request to:", `${PYTHON_API_URL}/predict`);
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

app.get("/api/scan", (req, res) => {
  res.status(405).json({ error: "Use POST method for predictions" });
});

// Handle unknown routes gracefully
app.use((req, res, next) => {
  if (req.url === "/favicon.ico") return res.status(204).end();
  console.log("Unknown request:", req.method, req.url);
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
