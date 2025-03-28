const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
// Correctly import from the newly created config file
const { GEMINI_API_KEY } = require('../config');
const { logError, logInfo, logWarn, logDebug } = require('../utils/logger'); // Assuming logger utility

if (!GEMINI_API_KEY) {
  logWarn('Gemini API Key not found. AI analysis will be skipped or mocked.');
  // Optionally throw an error if Gemini is critical and key is missing
  // throw new Error("Missing GEMINI_API_KEY environment variable.");
}

// Initialize Gemini Client (only if API key exists)
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null; // Or your desired model

const generationConfig = {
  temperature: 0.4, // Slightly lower temp for more deterministic JSON
  topK: 32,
  topP: 1,
  maxOutputTokens: 8192, // Adjust as needed
  // Ensure response is JSON
  responseMimeType: "application/json",
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// --- New Detailed Analysis Prompt ---
const INSTRUCTIONS = `Analyze the artwork and provide information on: title, artist, date, medium, dimensions, style, movement, influences, techniques, composition, perspective, texture, lighting, historical period, cultural background, political context, philosophical context, theme, narrative, symbols, subject type, origin, ownership history, current location, estimated value, exhibitions, market trends, popularity, critical reception, cultural impact, significance, digital reconstruction, AI analysis, scholarly analysis, related works, purpose, inspiration, message, fun facts, and artist signature.`;

const ARTWORK_ANALYSIS_PROMPT = `
${INSTRUCTIONS}

Return the analysis in JSON format, following this EXACT structure:

{
  "id": "string (Generate a UUID v4)",
  "title": "string (Suggest a title if unknown)",
  "artist": "string (Suggest 'Unknown Artist' if unknown)",
  "imageUrl": "string (Placeholder: 'will be replaced by backend')",
  "dateCreated": "string (Estimate year or period, e.g., 'c. 1910', 'Late 19th Century')",
  "medium": "string (e.g., 'Oil on canvas', 'Watercolor', 'Photograph')",
  "dimensions": {
    "height": "number (Estimate if unknown)",
    "width": "number (Estimate if unknown)",
    "depth": "number | null (Usually null for 2D)",
    "unit": "string (e.g., 'cm', 'in', 'px')"
  },
  "style": "string (e.g., 'Impressionism', 'Abstract')",
  "movement": "string (e.g., 'Renaissance', 'Surrealism')",
  "influences": "string[] (Artists, movements, or ideas)",
  "techniques": "string[] (e.g., 'Impasto', 'Chiaroscuro')",
  "composition": "string (Describe arrangement, e.g., 'Rule of thirds, diagonal lines')",
  "colorPalette": "string[]",
  "perspective": "string (e.g., 'Linear', 'Atmospheric', 'Forced')",
  "texture": "string (Describe surface quality, e.g., 'Smooth', 'Rough', 'Glossy')",
  "lighting": "string (Describe light source and effect, e.g., 'Natural, dramatic shadows')",
  "historicalPeriod": "string (e.g., 'Baroque', 'Modern')",
  "culturalBackground": "string (Relevant cultural context)",
  "politicalContext": "string | null (If relevant)",
  "philosophicalContext": "string | null (If relevant)",
  "theme": "string (Main subject or idea)",
  "narrative": "string | null (Story being told, if any)",
  "symbols": [
    { "element": "string (Object/figure)", "meaning": "string (Its symbolic meaning)" }
  ],
  "subjectType": "string (e.g., 'Portrait', 'Landscape', 'Still Life', 'Abstract')",
  "origin": {
    "location": "string (Place of creation)",
    "date": "string (Date of creation, can be same as dateCreated)"
  },
  "ownershipHistory": [
    { "owner": "string (Name or type, e.g., 'Private Collection')", "period": "string (Years, e.g., '1950-1980')" }
  ],
  "currentLocation": "string (Museum, gallery, or 'Private Collection')",
  "estimatedValue": "number | null (Monetary value, if known/estimable)",
  "exhibitions": [
    {
      "name": "string (Exhibition title)",
      "location": "string (Venue)",
      "date": "string (Year or date range)"
    }
  ],
  "marketTrends": {
    "dates": "string[] (Array of years/dates)",
    "values": "number[] (Array of corresponding estimated values)"
  },
  "popularityMetrics": {
    "monthlyViews": "number (Estimate based on similar works)",
    "socialMentions": "number (Estimate)",
    "academicCitations": "number (Estimate)"
  },
  "criticalReception": "string (Summary of how critics viewed it)",
  "culturalImpact": "string (Influence on culture, other artists)",
  "currentSignificance": "string (Why it's important today)",
  "hasDigitalReconstruction": "boolean (Usually false unless known)",
  "digitalInsights": {
    "reconstruction": "string | null (Link or description if exists)",
    "interactiveFeatures": "string[] | null (e.g., ['Zoom', '3D Model'])"
  },
  "aiAnalysis": {
    "authenticityScore": "number (0.0-1.0, confidence it's by the attributed artist)",
    "hiddenDetails": "string[] (Details not immediately obvious)",
    "styleConfidence": "number (0.0-1.0, confidence in style classification)"
  },
  "scholarlyAnalysis": [
    {
      "author": "string (Scholar's name)",
      "publication": "string (Book/Journal title)",
      "summary": "string (Brief summary of their analysis)"
    }
  ],
  "relatedWorks": [
    {
      "id": "string (ID of related work, if known)",
      "title": "string (Title of related work)",
      "relationship": "string (e.g., 'Study for', 'Inspired by', 'Series')"
    }
  ],
  "purpose": "string (Why the artist created it, e.g., 'Commission', 'Personal expression')",
  "inspiration": "string | null (Specific source of inspiration)",
  "intendedMessage": "string | null (What the artist wanted to convey)",
  "funFacts": "string[] (Interesting trivia)",
  "artistSignature": "string | null (Description or location if visible, otherwise null)",
  "createdAt": "string (Placeholder: 'will be replaced by backend')",
  "updatedAt": "string (Placeholder: 'will be replaced by backend')",
  "uploadedBy": "string (Placeholder: 'will be replaced by backend')"
}

IMPORTANT:
*   The response MUST be a single, valid JSON object. No other text is allowed.
*   Do not leave ANY fields as "null" or empty arrays [] EXCEPT where explicitly allowed (marked with "| null"). You MUST provide a value for EVERY field, even if it's an educated guess or a placeholder like "Unknown" or "Not Applicable".
*   **colorPalette**: This MUST be an array of 4-6 HEX color codes (e.g., ["#FF0000", "#00FF00", "#0000FF"]) representing the DOMINANT and VISUALLY REPRESENTATIVE colors in the artwork. Do NOT include color names.

Analyze the provided image now.
`;


/**
 * Analyzes an image using the Gemini API.
 * @param {string} base64ImageData The base64 encoded image data.
 * @param {string} mimeType The MIME type of the image (e.g., 'image/jpeg').
 * @returns {Promise<object>} The analysis result object.
 * @throws {Error} If the analysis fails or API key is missing.
 */
const analyzeImageWithGemini = async (base64ImageData, mimeType) => {
  logInfo(`Initiating Gemini analysis for image (MIME type: ${mimeType})`);

  if (!model) {
    logError("Gemini model not initialized (API Key likely missing or invalid).");
    throw new Error("AI analysis unavailable: Gemini model not initialized.");
  }

  const parts = [
    // The prompt text now includes detailed instructions and JSON structure
    { text: ARTWORK_ANALYSIS_PROMPT },
    {
      inlineData: {
        mimeType: mimeType,
        data: base64ImageData,
      },
    },
  ];

  try {
    logInfo("Sending request to Gemini API...");
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig, // Includes responseMimeType: "application/json"
      safetySettings,
    });

    // --- Robust Response Handling ---
    if (!result || !result.response) {
        logError("Gemini API returned an invalid or empty result structure.");
        throw new Error("AI analysis failed: Invalid response structure from Gemini.");
    }

    const response = result.response;

    // Check for safety blocks or other explicit denials
     if (response.promptFeedback?.blockReason) {
        logError(`Gemini API blocked prompt: ${response.promptFeedback.blockReason}`, response.promptFeedback);
        throw new Error(`AI analysis blocked by content safety filter: ${response.promptFeedback.blockReason}`);
     }
     // Since we requested JSON, check if the content part exists and has text
     if (!response.candidates || response.candidates.length === 0 || !response.candidates[0].content || !response.candidates[0].content.parts || response.candidates[0].content.parts.length === 0 || !response.candidates[0].content.parts[0].text) {
        logError("Gemini API returned no valid candidates or text content in the response.", response);
        throw new Error("AI analysis failed: No JSON content generated by Gemini.");
     }

    // Extract text - expecting JSON string here due to responseMimeType
    const generatedJsonString = response.candidates[0].content.parts[0].text;

    logInfo("Received response text from Gemini. Attempting to parse as JSON...");
    logDebug(`Raw Gemini Response Text:\n${generatedJsonString}`); // Log raw text for debugging

    // Attempt to parse the text as JSON
    try {
      // JSON.parse is sufficient now as Gemini should return a JSON string
      const analysisJson = JSON.parse(generatedJsonString);
      logInfo("Successfully parsed Gemini response as JSON.");

      // Basic validation (can be expanded based on the new structure)
      if (!analysisJson.id || !analysisJson.title || !analysisJson.artist) {
          logWarn("Parsed JSON from Gemini seems incomplete or missing core fields.", analysisJson);
          // Decide whether to throw or proceed with partial data
          // throw new Error("AI analysis failed: Parsed JSON is incomplete.");
      }
      return analysisJson;
    } catch (parseError) {
      logError(`Failed to parse Gemini response as JSON. Error: ${parseError.message}`, { rawText: generatedJsonString });
      // Check for common issues
      if (generatedJsonString.trim().startsWith('<')) {
           logError("Gemini response started with '<', indicating potential HTML error page instead of JSON.");
      } else {
           logError("The response received was not valid JSON.")
      }
      throw new Error(`AI analysis failed: Could not parse response. ${parseError.message}`);
    }

  } catch (error) {
    // Catch errors from the API call itself (e.g., network issues, auth errors)
    logError(`Error during Gemini API call: ${error.message}`, error);

    // Check if it's a fetch-related error (common in restricted environments)
    if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
      throw new Error(`AI analysis failed: Network error communicating with Gemini API. (${error.message})`);
    }
    // Re-throw other errors or wrap them
    throw new Error(`AI analysis failed: ${error.message}`);
  }
};

module.exports = {
    analyzeImageWithGemini,
};
