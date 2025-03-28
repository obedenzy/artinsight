const { Router } = require('express');
const multer = require('multer'); // Import multer
const {
    analyzeAndSaveArtworkController,
    getUserArtworksController,
    getArtworkByIdController
} = require('../controllers/artworkController');
const { protect } = require('../middleware/authMiddleware'); // Import protect middleware

const router = Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit (Updated)
});

// POST /api/artworks/analyze - Analyze, Upload, and Save Artwork
// Requires authentication, uses multer to handle single file upload with field name 'artworkImage'
router.post(
    '/analyze',
    protect,
    upload.single('artworkImage'), // Use multer middleware here
    analyzeAndSaveArtworkController
);

// GET /api/artworks - Get artworks for the logged-in user
// Requires authentication
router.get('/', protect, getUserArtworksController);

// GET /api/artworks/:id - Get a specific artwork by ID
// Requires authentication
router.get('/:id', protect, getArtworkByIdController);


// --- Other artwork-related endpoints can be added here ---
// Example:
// router.put('/:id', protect, updateArtworkController);
// router.delete('/:id', protect, deleteArtworkController);

module.exports = router;
