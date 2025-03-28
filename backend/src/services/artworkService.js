const supabase = require('../lib/supabaseClient');
const { v4: uuidv4 } = require('uuid');
const { logError, logInfo, logWarn, logDebug } = require('../utils/logger'); // Import logger

/**
 * Uploads an image buffer to Supabase Storage.
 */
const uploadImageToStorage = async (imageBuffer, mimeType, userId, originalFilename) => {
    if (!userId) {
        logError("User ID missing for storage upload.");
        throw new Error("User ID is required for uploading image.");
    }
    // Sanitize filename
    const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.]/g, '_');
    const uniqueFileName = `${uuidv4()}_${safeFilename}`;
    const filePath = `public/${userId}/${uniqueFileName}`; // User-specific folder

    logInfo(`Uploading to Supabase Storage: Bucket=artwork-images, Path=${filePath}, MimeType=${mimeType}`);

    const { data, error } = await supabase.storage
        .from('artwork-images')
        .upload(filePath, imageBuffer, {
            contentType: mimeType,
            upsert: false,
        });

    if (error) {
        logError(`Supabase storage upload failed for path ${filePath}. Error: ${error.message}`, error);
        // Provide more specific error messages based on Supabase client errors
        let errorMessage = `Supabase storage upload failed: ${error.message}`;
        if (error.message.toLowerCase().includes('bucket not found')) {
             errorMessage = "Configuration error: Supabase Storage bucket 'artwork-images' not found or permissions incorrect.";
        } else if (error.message.toLowerCase().includes('mime type')) {
             errorMessage = `Invalid file type provided to Supabase Storage: ${mimeType}. ${error.message}`;
        } else if (error.message.toLowerCase().includes('size limit exceeded')) {
             errorMessage = `File size limit exceeded for Supabase Storage. ${error.message}`;
        } else if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
             errorMessage = `Network error: Could not reach Supabase Storage. (${error.message})`;
        }
        // Ensure the specific error message is thrown
        throw new Error(errorMessage);
    }

    if (!data || !data.path) {
         logError(`Supabase storage upload for ${filePath} returned no path, though no error was reported.`, data);
         throw new Error("Supabase storage upload returned no path unexpectedly.");
    }

    logInfo(`Supabase storage upload successful, path: ${data.path}`);

    // Get public URL
    const { data: urlData } = supabase.storage.from('artwork-images').getPublicUrl(data.path);

    if (!urlData || !urlData.publicUrl) {
        logWarn(`Could not get public URL for ${data.path}. Returning storage path instead. Check bucket permissions.`);
        // Consider throwing an error if public URL is strictly required downstream
        // throw new Error(`Failed to get public URL for uploaded image: ${data.path}`);
        return data.path; // Fallback to path
    }

    logInfo(`Public URL obtained: ${urlData.publicUrl}`);
    return urlData.publicUrl;
};


/**
 * Saves artwork metadata and its analysis results to the database.
 */
const saveArtworkAndAnalysis = async (analysisResult, imageUrl, userId) => {
    if (!userId) {
        logError("User ID missing for saving artwork.");
        throw new Error("User ID is required for saving artwork.");
    }
    if (!analysisResult || typeof analysisResult !== 'object') {
        logError("Invalid or missing analysis result for saving artwork.", analysisResult);
        throw new Error("Valid analysis result object is required for saving artwork.");
    }
     if (!imageUrl) {
        logError("Image URL missing for saving artwork.");
        throw new Error("Image URL is required for saving artwork.");
    }

    // Ensure analysisResult has necessary nested structure, provide defaults if missing
    const analysisInput = analysisResult.analysis || {};

    // Map frontend/analysis keys to DB snake_case columns
    const artworkData = {
        id: analysisResult.id || uuidv4(),
        title: analysisResult.title || 'Untitled Artwork',
        artist: analysisResult.artist || 'Unknown Artist',
        date_created: analysisResult.dateCreated || null,
        medium: analysisResult.medium || null,
        dimensions: analysisResult.dimensions || null,
        description: analysisResult.description || null,
        image_url: imageUrl,
        owner_id: userId, // Use the authenticated user ID
        is_public: analysisResult.isPublic === true, // Ensure boolean
        original_filename: analysisResult.originalFilename || null,
        // Add other artwork fields from analysisResult if they exist
        provenance: analysisResult.provenance || [],
        exhibition_history: analysisResult.exhibitionHistory || [],
        publications: analysisResult.publications || [],
        // market_value: analysisResult.marketValue || null, // Handle complex types carefully
    };

    const analysisData = {
        // id is auto-generated by DB
        artwork_id: artworkData.id, // Link to the artwork record
        style: analysisInput.style || null,
        subject: analysisInput.subject || null,
        color_palette: analysisInput.colorPalette || null,
        composition: analysisInput.composition || null,
        technique: analysisInput.technique || null,
        historical_context: analysisInput.historicalContext || null,
        artist_intent: analysisInput.artistIntent || null,
        emotional_response: analysisInput.emotionalResponse || null,
        keywords: analysisInput.keywords || null,
        confidence_score: analysisInput.confidenceScore || null,
        raw_analysis_data: analysisInput.rawAnalysisData || analysisResult.rawAnalysisData || null, // Allow raw data at top level too
        // fun_facts might belong on the artwork table or a separate one
    };

    logInfo(`Attempting to insert artwork into DB for user ${userId}, ID: ${artworkData.id}`);
    logDebug("Artwork data for DB:", artworkData);
    logDebug("Analysis data for DB:", analysisData);

    // --- Insert Artwork ---
    const { data: artworkInsertData, error: artworkError } = await supabase
        .from('artworks')
        .insert([artworkData])
        .select()
        .single();

    if (artworkError) {
        logError(`Supabase artwork insert failed for ID ${artworkData.id}. Error: ${artworkError.message}`, artworkError);
        let errorMessage = `Database error saving artwork: ${artworkError.message}`;
         if (artworkError.message.includes('fetch') || artworkError.message.includes('NetworkError')) {
            errorMessage = `Network error: Could not reach Supabase Database to save artwork. (${artworkError.message})`;
        } else if (artworkError.message.includes('violates foreign key constraint')) {
             errorMessage = `Database integrity error (foreign key): ${artworkError.details || artworkError.message}`;
        } else if (artworkError.message.includes('violates unique constraint')) {
             errorMessage = `Database integrity error (unique constraint): Artwork ID ${artworkData.id} might already exist. ${artworkError.details || artworkError.message}`;
        } else if (artworkError.message.includes('value too long')) {
             errorMessage = `Database error: Data too long for a column. ${artworkError.details || artworkError.message}`;
        } else if (artworkError.message.includes('invalid input syntax')) {
             errorMessage = `Database error: Invalid data format for a column. ${artworkError.details || artworkError.message}`;
        }
        throw new Error(errorMessage);
    }

    if (!artworkInsertData) {
        logError(`Artwork insert for ID ${artworkData.id} returned no data, though no error was reported.`);
        throw new Error("Artwork insert operation returned no data unexpectedly.");
    }

    logInfo(`Artwork inserted successfully: ID ${artworkInsertData.id}`);

    // --- Insert Analysis ---
    analysisData.artwork_id = artworkInsertData.id; // Ensure correct ID link
    logInfo(`Attempting to insert analysis for artwork ID ${artworkInsertData.id}`);

    const { data: analysisInsertData, error: analysisError } = await supabase
        .from('artwork_analyses')
        .insert([analysisData])
        .select()
        .single();

    if (analysisError) {
        logError(`Supabase analysis insert failed for artwork ID ${artworkInsertData.id}. Error: ${analysisError.message}`, analysisError);
        // Consider cleanup? For now, log and throw. The artwork record will exist without analysis.
        let errorMessage = `Database error saving analysis: ${analysisError.message}`;
         if (analysisError.message.includes('fetch') || analysisError.message.includes('NetworkError')) {
            errorMessage = `Network error: Could not reach Supabase Database to save analysis. (${analysisError.message})`;
        } else if (analysisError.message.includes('violates foreign key constraint')) {
             errorMessage = `Database integrity error linking analysis to artwork ${artworkInsertData.id}: ${analysisError.details || analysisError.message}`;
        }
        // Log warning that artwork exists without analysis
        logWarn(`Analysis insert failed for artwork ${artworkInsertData.id}. Artwork record remains without analysis data.`);
        throw new Error(errorMessage + ` (Artwork ID: ${artworkInsertData.id})`);
    }

     if (!analysisInsertData) {
        logError(`Analysis insert for artwork ${artworkInsertData.id} returned no data, though no error was reported.`);
        // Decide if this is critical. Maybe analysis is optional? For now, treat as error.
        throw new Error("Analysis insert operation returned no data unexpectedly.");
    }

    logInfo(`Analysis inserted successfully for artwork ID: ${artworkInsertData.id}`);

    // Fetch the combined data to return a consistent object
    logInfo(`Fetching combined artwork and analysis for ID ${artworkInsertData.id} to return.`);
    const finalArtwork = await getArtworkWithAnalysis(artworkInsertData.id, userId);
    if (!finalArtwork) {
        logError(`Failed to fetch newly created artwork ${artworkInsertData.id} immediately after creation.`);
        // This shouldn't happen if inserts succeeded and RLS is correct
        // Return the manually combined data as a fallback, though it might be slightly different than the fetched version
        return { ...artworkInsertData, analysis: analysisInsertData };
    }
    return finalArtwork;
};

/**
 * Fetches all artworks belonging to a specific user.
 */
const getUserArtworks = async (userId) => {
    if (!userId) {
        logError("User ID missing for fetching artworks.");
        throw new Error("User ID is required to fetch artworks.");
    }
    logInfo(`Fetching artworks for user: ${userId}`);

    const { data, error } = await supabase
        .from('artworks')
        .select(`
            *,
            analysis:artwork_analyses(*)
        `)
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        logError(`Supabase error fetching user artworks for user ${userId}: ${error.message}`, error);
         let errorMessage = `Database error fetching artworks: ${error.message}`;
         if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
            errorMessage = `Network error: Could not reach Supabase Database to fetch artworks. (${error.message})`;
        } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
             errorMessage = `Database schema error: ${error.message}. Check table/view names and RLS policies.`;
        }
        throw new Error(errorMessage);
    }

    const artworks = data || [];
    logInfo(`Found ${artworks.length} artworks for user ${userId}`);

    // Ensure analysis is an object, not an array[1]
    return artworks.map(artwork => ({
        ...artwork,
        analysis: Array.isArray(artwork.analysis) ? artwork.analysis[0] : artwork.analysis
    }));
};

/**
 * Fetches a single artwork with its analysis details by ID, ensuring user ownership.
 */
const getArtworkWithAnalysis = async (artworkId, userId) => {
    if (!artworkId || !userId) {
        logError("Artwork ID or User ID missing for fetching artwork details.", { artworkId, userId });
        throw new Error("Artwork ID and User ID are required.");
    }
    logInfo(`Fetching artwork ID: ${artworkId} for user: ${userId}`);

    const { data, error } = await supabase
        .from('artworks')
        .select(`
            *,
            analysis:artwork_analyses(*)
        `)
        .eq('id', artworkId)
        .eq('owner_id', userId) // RLS should enforce this, but explicit check is safer
        .maybeSingle();

    if (error) {
        logError(`Supabase error fetching artwork ${artworkId} for user ${userId}: ${error.message}`, error);
        let errorMessage = `Database error fetching artwork details: ${error.message}`;
         if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
            errorMessage = `Network error: Could not reach Supabase Database to fetch artwork details. (${error.message})`;
        }
        throw new Error(errorMessage);
    }

    if (!data) {
        logWarn(`Artwork ${artworkId} not found or not owned by user ${userId}.`);
        return null;
    }

     logInfo(`Artwork ${artworkId} fetched successfully.`);
     // Ensure analysis is an object
     const artwork = {
        ...data,
        analysis: Array.isArray(data.analysis) ? data.analysis[0] : data.analysis
     };
     logDebug("Fetched artwork details:", artwork);

    return artwork;
};


module.exports = {
    uploadImageToStorage,
    saveArtworkAndAnalysis,
    getUserArtworks,
    getArtworkWithAnalysis,
};
