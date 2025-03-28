const { analyzeImageWithGemini } = require('../services/geminiService');
const { uploadImageToStorage, saveArtworkAndAnalysis, getUserArtworks, getArtworkWithAnalysis } = require('../services/artworkService');
const { Buffer } = require('buffer'); // Node.js Buffer
const { v4: uuidv4 } = require('uuid'); // For generating mock IDs
const { logError, logInfo, logWarn, logDebug } = require('../utils/logger'); // Import logger

// --- Mock Analysis Data ---
// Updated Mock Data Generation to align better with the new detailed structure
const generateMockAnalysis = (userId, originalFilename = 'uploaded_image.jpg') => {
    const mockId = uuidv4();
    const now = new Date();
    const randomYear = now.getFullYear() - Math.floor(Math.random() * 100);
    logInfo(`Generating mock analysis for user ${userId}, filename: ${originalFilename}`);
    return {
        id: mockId,
        title: `Mock Analysis: ${originalFilename}`,
        artist: "Unknown Artist (Mock)",
        imageUrl: `/api/placeholder/image/${mockId}.jpg`, // Placeholder URL
        dateCreated: `c. ${randomYear}`,
        medium: "Mixed Media (Mock)",
        dimensions: {
            height: Math.floor(Math.random() * 100) + 20,
            width: Math.floor(Math.random() * 100) + 20,
            depth: null,
            unit: "cm"
        },
        style: "Eclectic (Mock)",
        movement: "Postmodern Mockism",
        influences: ["Network Error", "Placeholder Data"],
        techniques: ["Digital Mockup", "Random Generation"],
        composition: "Centered (Mock)",
        colorPalette: ["#AABBCC", "#CCDDEE", "#EEFFAA", "#FFAABB", "#BBAACC"], // Mock hex codes
        perspective: "Flat (Mock)",
        texture: "Simulated (Mock)",
        lighting: "Ambient (Mock)",
        historicalPeriod: `${Math.floor(randomYear / 100) * 100}s`,
        culturalBackground: "Digital Environment (Mock)",
        politicalContext: null,
        philosophicalContext: "Existential Mockness",
        theme: "Mock Data Representation",
        narrative: "A story of temporary data.",
        symbols: [{ element: "Glitch", meaning: "System Limitation" }],
        subjectType: "Abstract Mock",
        origin: {
            location: "WebContainer",
            date: now.toISOString().split('T')[0]
        },
        ownershipHistory: [{ owner: "Mock Generator", period: `Since ${now.toISOString()}` }],
        currentLocation: "In Memory",
        estimatedValue: null,
        exhibitions: [],
        marketTrends: { dates: [], values: [] },
        popularityMetrics: { monthlyViews: 0, socialMentions: 0, academicCitations: 0 },
        criticalReception: "N/A (Mock Data)",
        culturalImpact: "Minimal (Mock Data)",
        currentSignificance: "Represents backend limitations.",
        hasDigitalReconstruction: false,
        digitalInsights: { reconstruction: null, interactiveFeatures: null },
        aiAnalysis: {
            authenticityScore: 0.1,
            hiddenDetails: ["Generated due to error"],
            styleConfidence: 0.2
        },
        scholarlyAnalysis: [],
        relatedWorks: [],
        purpose: "To provide placeholder data during network failure.",
        inspiration: "Error Handling",
        intendedMessage: "This is mock data.",
        funFacts: ["This analysis was automatically generated.", "It does not reflect the actual artwork."],
        artistSignature: null,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        uploadedBy: userId,
        // --- Fields needed for DB saving but maybe not in Gemini response ---
        ownerId: userId,
        isPublic: false,
        originalFilename: originalFilename,
        // Add analysis nested object for consistency if saveArtworkAndAnalysis expects it
        analysis: { // Mock the nested analysis part too
            style: ["Eclectic (Mock)"], // Match top-level for simplicity
            subject: ["Abstract Mock"], // Match top-level
            colorPalette: [ // Match top-level
                 { color: "#AABBCC", percentage: 20 },
                 { color: "#CCDDEE", percentage: 20 },
                 { color: "#EEFFAA", percentage: 20 },
                 { color: "#FFAABB", percentage: 20 },
                 { color: "#BBAACC", percentage: 20 }
            ],
            composition: "Centered (Mock)",
            technique: ["Digital Mockup"],
            historicalContext: `${Math.floor(randomYear / 100) * 100}s`,
            artistIntent: "Provide placeholder data.",
            emotionalResponse: "Neutral",
            keywords: ["mock", "placeholder", "error"],
            confidenceScore: 0.1,
            rawAnalysisData: { message: "This is raw mock data because external services failed." },
        }
    };
};


/**
 * Controller to handle artwork analysis requests.
 */
const analyzeAndSaveArtworkController = async (req, res, next) => {
  logInfo("analyzeAndSaveArtworkController invoked.");
  try {
    const file = req.file; // File object from multer
    const userId = req.user?.id; // User ID from auth middleware

    if (!userId) {
        logWarn("Authentication required for artwork analysis.");
        const error = new Error('Authentication required.');
        error.statusCode = 401;
        throw error;
    }
    logInfo(`User ${userId} authenticated for analysis.`);

    if (!file) {
      logWarn("Image file missing in analysis request.");
      const error = new Error('Image file is required in the request (field name: artworkImage)');
      error.statusCode = 400;
      throw error;
    }

    const imageBuffer = file.buffer;
    const mimeType = file.mimetype;
    const originalFilename = file.originalname; // Get original filename

    logInfo(`Received image for analysis. User: ${userId}, MimeType: ${mimeType}, Size: ${imageBuffer.length} bytes, Filename: ${originalFilename}`);
    logDebug("Image buffer (first 50 bytes):", imageBuffer.slice(0, 50).toString('hex')); // Log start of buffer for verification

    const base64Data = imageBuffer.toString('base64');
    // Log the beginning of the base64 string (Updated)
    logDebug(`Base64 Image Data (first 100 chars): ${base64Data.substring(0, 100)}...`);

    let imageStoragePath = null;
    let analysisResult = null;
    let savedArtwork = null;
    let operationFailed = false;
    let failureReason = 'Unknown failure'; // Default reason

    // --- Attempt Operations (expecting failures due to network) ---
    try {
        logInfo("Step 1: Attempting to upload image to storage...");
        imageStoragePath = await uploadImageToStorage(imageBuffer, mimeType, userId, originalFilename);
        logInfo(`Image uploaded successfully to storage. Path/URL: ${imageStoragePath}`);

        logInfo("Step 2: Attempting AI analysis via Gemini...");
        analysisResult = await analyzeImageWithGemini(base64Data, mimeType);

        // --- Integrate analysisResult with necessary backend fields ---
        // Ensure required fields from the backend perspective are present
        analysisResult.id = analysisResult.id || uuidv4(); // Ensure ID exists
        analysisResult.imageUrl = imageStoragePath; // Use the actual storage path
        analysisResult.uploadedBy = userId;
        analysisResult.ownerId = userId; // Ensure ownerId is set
        analysisResult.isPublic = analysisResult.isPublic || false; // Default isPublic
        analysisResult.originalFilename = originalFilename;
        analysisResult.createdAt = analysisResult.createdAt || new Date().toISOString();
        analysisResult.updatedAt = analysisResult.updatedAt || new Date().toISOString();

        // Add nested 'analysis' object if saveArtworkAndAnalysis expects it based on DB schema
        // This might involve mapping fields from the flat Gemini response to the nested structure
        // For now, let's assume saveArtworkAndAnalysis handles the flat structure or we adapt it later.
        // If saveArtworkAndAnalysis strictly needs the nested structure:
        /*
        analysisResult.analysis = {
            id: uuidv4(), // Or generate in DB
            artworkId: analysisResult.id,
            style: Array.isArray(analysisResult.style) ? analysisResult.style : [analysisResult.style], // Ensure array
            subject: Array.isArray(analysisResult.subjectType) ? analysisResult.subjectType : [analysisResult.subjectType], // Map subjectType
            colorPalette: analysisResult.colorPalette?.map(hex => ({ color: hex, percentage: null })) || [], // Map hex array
            composition: analysisResult.composition,
            technique: analysisResult.techniques,
            historicalContext: analysisResult.historicalPeriod,
            artistIntent: analysisResult.intendedMessage,
            emotionalResponse: "N/A", // Gemini prompt doesn't ask for this directly
            keywords: analysisResult.theme ? analysisResult.theme.split(',').map(k => k.trim()) : [], // Generate keywords from theme
            confidenceScore: analysisResult.aiAnalysis?.styleConfidence || 0.5, // Use AI confidence
            rawAnalysisData: analysisResult // Store the whole Gemini result as raw data
        };
        */

        logInfo("AI analysis successful.");
        logDebug("Raw analysis result from Gemini:", analysisResult); // Log the result received

        logInfo("Step 3: Attempting to save artwork and analysis to DB...");
        // Pass the potentially modified analysisResult
        savedArtwork = await saveArtworkAndAnalysis(analysisResult, imageStoragePath, userId);
        logInfo(`Artwork and analysis saved successfully to DB. ID: ${savedArtwork?.id}`);

    } catch (error) {
        operationFailed = true;
        failureReason = error.message || 'Operation failed with unspecified error';
        logError(`Operation failed during analysis process: ${failureReason}`, error); // Log the full error object

        // Check for specific error messages indicating network or service failure
        const isNetworkOrServiceError = failureReason.includes('fetch') ||
                                        failureReason.includes('Network error') ||
                                        failureReason.includes('AI analysis unavailable') ||
                                        failureReason.includes('AI analysis failed') || // Catch errors from Gemini service
                                        failureReason.includes('storage upload failed') ||
                                        failureReason.includes('Database error') ||
                                        failureReason.includes('Supabase'); // Broad catch for Supabase issues

        if (isNetworkOrServiceError) {
            logWarn(`Network or dependent service error detected: "${failureReason}". Generating mock response.`);
            // Generate mock data using the updated function
            savedArtwork = generateMockAnalysis(userId, originalFilename);
            logInfo(`Generated mock artwork data. ID: ${savedArtwork?.id}`);
        } else {
            // If it's a different kind of error (e.g., validation, unexpected logic error),
            // do not generate mock data, let the main error handler deal with it.
            logError("Unexpected error type encountered, not generating mock data.", error);
            // Pass the original error to the centralized handler
             next(error);
             return; // Stop execution here
        }
    }

    // --- Send Response ---
    if (savedArtwork) {
        const responseStatus = operationFailed ? 201 : 201; // Still 201 Created, even if mock
        const responseMessage = operationFailed
            ? `Artwork analysis partially failed due to: ${failureReason}. Displaying mock data.`
            : "Artwork analyzed and saved successfully.";
        logInfo(`Sending ${operationFailed ? 'mock' : 'real'} analysis result to client. Status: ${responseStatus}. Message: ${responseMessage}`);
        res.status(responseStatus).json({
            message: responseMessage,
            artwork: savedArtwork // Send the real or mock artwork data
        });
    } else {
         // This case should ideally not be reached if the catch block handles errors properly,
         // but included as a fallback.
         logError(`Analysis process completed without generating a result. Last known error: ${failureReason}`);
         const fallbackError = new Error(`Analysis process completed without generating a result. Last known error: ${failureReason}`);
         fallbackError.statusCode = 500;
         next(fallbackError);
    }

  } catch (error) {
     // Catch errors from initial checks (auth, file presence) or unexpected errors
     logError(`Unhandled error in analyzeAndSaveArtworkController: ${error.message}`, error);
     // Pass the error to the next middleware (the error handler)
     next(error);
  }
};

// Controller to get artworks for the logged-in user
const getUserArtworksController = async (req, res, next) => {
    logInfo("getUserArtworksController invoked.");
    try {
        const userId = req.user?.id;
        if (!userId) {
             logWarn("Authentication required for fetching user artworks.");
            return res.status(401).json({ message: 'Authentication required.' });
        }
        logInfo(`Fetching artworks for user: ${userId}`);

        const artworks = await getUserArtworks(userId);
        logInfo(`Found ${artworks.length} artworks for user ${userId}.`);
        res.status(200).json(artworks);

    } catch (error) {
        logError(`Error in getUserArtworksController: ${error.message}`, error);
        next(error);
    }
};

// Controller to get a specific artwork by ID for the logged-in user
const getArtworkByIdController = async (req, res, next) => {
     logInfo("getArtworkByIdController invoked.");
    try {
        const userId = req.user?.id;
        const { id: artworkId } = req.params;
         logInfo(`Attempting to fetch artwork ID: ${artworkId} for user: ${userId}`);

        if (!userId) {
             logWarn(`Authentication required for fetching artwork ${artworkId}.`);
            return res.status(401).json({ message: 'Authentication required.' });
        }
        if (!artworkId) {
             logWarn("Artwork ID missing in request.");
            return res.status(400).json({ message: 'Artwork ID is required.' });
        }

        // Handle potential mock IDs explicitly if needed, though DB fetch should just fail
        if (artworkId.includes('-mock-') || artworkId.startsWith('placeholder_') || artworkId.length !== 36) { // Basic UUID check
             logWarn(`Attempt to fetch potentially mock/placeholder or invalid ID: ${artworkId}`);
             // Decide whether to return 404 or handle differently
             return res.status(404).json({ message: 'Artwork not found (invalid or mock ID).' });
        }

        const artwork = await getArtworkWithAnalysis(artworkId, userId);

        if (!artwork) {
            // RLS policy might have blocked access or artwork doesn't exist
            logWarn(`Artwork ${artworkId} not found or access denied for user ${userId}.`);
            return res.status(404).json({ message: 'Artwork not found or access denied.' });
        }

        logInfo(`Artwork ${artworkId} fetched successfully for user ${userId}.`);
        res.status(200).json(artwork);

    } catch (error) {
        logError(`Error in getArtworkByIdController for ID ${req.params?.id}: ${error.message}`, error);
        // Handle potential network errors when fetching from DB more explicitly if needed
        if (error.message.includes('fetch failed') || error.message.includes('Network error')) {
             logWarn(`Network error fetching artwork by ID ${req.params?.id}. Returning 404.`);
             // Return 404 or a specific error indicating temporary unavailability
             return res.status(503).json({ message: 'Could not retrieve artwork due to a temporary network issue.' });
        }
        next(error);
    }
};


module.exports = {
    analyzeAndSaveArtworkController,
    getUserArtworksController,
    getArtworkByIdController,
};
