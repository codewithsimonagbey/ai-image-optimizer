import sharp from "sharp";
import axios from "axios";

/**
 * Optimizes an image by resizing and reducing quality.
 * @param {string} inputPath - Image file path or URL.
 * @param {number} width - Target width.
 * @param {number} height - Target height.
 * @param {number} quality - JPEG/PNG/WebP quality (1-100).
 * @returns {Buffer} - Optimized image buffer.
 */
export const optimizeImage = async (inputPath, width = 800, height = 600, quality = 80) => {
  try {
    let imageBuffer;

    if (inputPath.startsWith("http")) {
      const response = await axios.get(inputPath, { responseType: "arraybuffer" });
      imageBuffer = Buffer.from(response.data);
    } else {
      imageBuffer = inputPath;
    }

    return await sharp(imageBuffer)
      .resize(width, height, { fit: "cover" })
      .toFormat("webp")
      .webp({ quality })
      .toBuffer();
  } catch (error) {
    console.error("Error optimizing image:", error);
    throw error;
  }
};
