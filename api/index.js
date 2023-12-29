const express = require('express');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = process.env.PORT || 3000;

cloud_name = process.env.CLOUDINARY_CLOUD_NAME
api_key = process.env.CLOUDINARY_API_KEY
api_secret = process.env.CLOUDINARY_API_SECRET

// Configure Cloudinary
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

// Define a route to fetch images from Cloudinary
app.get('/api/images', async (req, res) => {
    try {
        const cloudinaryResponse = await cloudinary.api.resources({type: 'upload', max_results: 10, context: true})
        .then();

        res.json(cloudinaryResponse.resources);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
