import express from 'express';
const router = express.Router();
import client from '../weaviate.js';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer; // Get the image buffer from the uploaded file
    const imageBase64 = imageBuffer.toString('base64'); // Convert the buffer to base64

    await client.data.creator()
      .withClassName('Images')
      .withProperties({
        image: imageBase64,
      })
      .do();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

export default router;

