/**
 * Ollama Service
 * 
 * Encapsulates all communication with the Ollama API.
 * Reads OLLAMA_URL and OLLAMA_MODEL from environment variables.
 */

async function askOllama(prompt) {
    const ollamaUrl = process.env.OLLAMA_URL;
    const model = process.env.OLLAMA_MODEL;

    if (!ollamaUrl) {
        throw new Error("OLLAMA_URL environment variable is not set");
    }
    if (!model) {
        throw new Error("OLLAMA_MODEL environment variable is not set");
    }

    const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model,
            prompt,
            stream: false
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error (${response.status}): ${errorText}`);
    }

    return response.json();
}

module.exports = askOllama;
