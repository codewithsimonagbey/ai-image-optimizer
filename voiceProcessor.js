import { OpenAI } from "openai";
import speech from "@google-cloud/speech";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const speechClient = new speech.SpeechClient();

/**
 * Transcribes voice input and converts it into an image resizing command.
 * @param {Buffer} audioBuffer - The voice input file.
 * @returns {Object} - { width, height }
 */
export const transcribeVoiceCommand = async (audioBuffer) => {
  try {
    const [response] = await speechClient.recognize({
      audio: { content: audioBuffer.toString("base64") },
      config: { encoding: "LINEAR16", languageCode: "en-US" },
    });

    const text = response.results.map((result) => result.alternatives[0].transcript).join("\n");
    console.log("🎤 Transcribed Text:", text);

    // Convert text to a structured command using AI
    const aiResponse = await openai.completions.create({
      model: "gpt-4",
      prompt: `Extract the width and height from the following user request: "${text}".
      Response format: { "width": 800, "height": 600 }`,
      max_tokens: 50,
      temperature: 0,
    });

    return JSON.parse(aiResponse.choices[0].text);
  } catch (error) {
    console.error("Error processing voice command:", error);
    return { width: 800, height: 600 }; // Default fallback
  }
};
