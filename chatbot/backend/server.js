require("dotenv").config();

const express = require("express");
const cors = require("cors");
const chatRoute = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Routes
app.use("/chat", chatRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Ollama URL: ${process.env.OLLAMA_URL}`);
    console.log(`Ollama Model: ${process.env.OLLAMA_MODEL}`);
});