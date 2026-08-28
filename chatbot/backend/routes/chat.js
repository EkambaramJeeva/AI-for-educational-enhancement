const express = require("express");
const askOllama = require("../services/ollamaService");

const router = express.Router();

router.post("/", async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({ reply: "Message is required" });
    }

    try {
        const data = await askOllama(message.trim());

        res.json({
            reply: data.response
        });

    } catch (err) {
        console.error("Chat error:", err.message);

        res.status(500).json({
            reply: "Server Error"
        });
    }
});

module.exports = router;
