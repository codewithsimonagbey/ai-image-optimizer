import { optimizeImage } from "./imageProcessor.js";
import { transcribeVoiceCommand } from "./voiceProcessor.js";
import fs from "fs";

/**
 * Main function to optimize an image based on voice command.
 * @param {string} imagePath - Path or URL of image.
 * @param {Buffer} audioBuffer - Audio file buffer containing voice instructions.
 */
export const processImageWithVoice = async (
