import express from 'express';
const router = express.Router();
import client from '../weaviate.js'; // Import the client module from weaviate.js

router.post('/search', async (req, res) => {
  try {
    const { imageBase64 } = req.body; // Extract the base64-encoded image from the request body
    // Perform the search query using Weaviate
    const resImages = await client.graphql.get()
      .withClassName('Images')
      .withFields(['image'])
      .withNearImage({ image: imageBase64 }) // Use the base64-encoded image for the search
      .withLimit(1)
      .do();

    // Extract the result images from the response
    const result = resImages.data.Get.Images.map((item) => item.image); // Adjust the mapping to the correct class name

    res.status(200).json({ images: result });
  } catch (err) {
    console.error('Error searching in Weaviate:', err);
    res.status(500).json({ error: 'Error searching in Weaviate' });
  }
});

export default router;
