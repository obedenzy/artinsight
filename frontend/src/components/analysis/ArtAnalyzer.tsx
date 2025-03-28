import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { DetailedArtwork } from '../../types/artwork';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/env';
import { logError, logInfo, logWarn, logDebug } from '../../utils/logger'; // Assuming logger exists

interface Props {
  file: File;
  onAnalysisComplete: (result: DetailedArtwork) => void;
  onError: (error: string) => void;
}

// Helper function to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data URL prefix (e.g., "data:image/png;base64,")
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as Base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};


export function ArtAnalyzer({ file, onAnalysisComplete, onError }: Props) {
  const [progressMessage, setProgressMessage] = useState('Preparing analysis...');
  const { token } = useAuth();

  useEffect(() => {
    const analyzeArtwork = async () => {
      if (!file || !token) {
        if (!token) {
            logWarn("ArtAnalyzer: Authentication token not found.");
            onError("Authentication token not found. Please log in again.");
        } else {
            logWarn("ArtAnalyzer: No file provided for analysis.");
            onError("No file provided for analysis.");
        }
        return;
      }

      setProgressMessage('Converting image...');
      logInfo(`ArtAnalyzer: Starting analysis process for file: ${file.name}`);

      try {
        const imageBase64 = await fileToBase64(file);
        logDebug(`ArtAnalyzer: Image converted to Base64 (first 100 chars): ${imageBase64.substring(0, 100)}...`);
        setProgressMessage('Sending image for analysis...');

        const payload = {
          imageBase64: imageBase64,
          mimeType: file.type,
          originalFilename: file.name // Send original filename too
        };

        const response = await fetch(`${API_BASE_URL}/api/artworks/analyze`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set content type to JSON
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload), // Send JSON payload
        });

        setProgressMessage('Processing analysis results...');

        const result = await response.json();

        if (!response.ok) {
          logError(`ArtAnalyzer: Analysis API request failed: ${response.status}`, result);
          throw new Error(result.message || `Analysis failed with status: ${response.status}`);
        }

        logInfo("ArtAnalyzer: Analysis API request successful:", result);

        if (result.message && result.message.includes('mock data')) {
            logWarn("ArtAnalyzer: Backend returned mock data:", result.message);
        }

        if (!result.artwork) {
             logError("ArtAnalyzer: Analysis response did not contain artwork data.");
             throw new Error("Analysis response did not contain artwork data.");
        }

        // --- Map backend snake_case to frontend camelCase ---
        // This mapping assumes the backend might return snake_case keys
        const formattedResult: DetailedArtwork = {
            id: result.artwork.id,
            title: result.artwork.title,
            artist: result.artwork.artist,
            imageUrl: result.artwork.image_url || result.artwork.imageUrl, // Handle potential snake_case
            dateCreated: result.artwork.date_created || result.artwork.dateCreated,
            medium: result.artwork.medium,
            dimensions: result.artwork.dimensions,
            style: result.artwork.style,
            movement: result.artwork.movement,
            influences: result.artwork.influences,
            techniques: result.artwork.techniques,
            composition: result.artwork.composition,
            colorPalette: result.artwork.color_palette || result.artwork.colorPalette,
            perspective: result.artwork.perspective,
            texture: result.artwork.texture,
            lighting: result.artwork.lighting,
            historicalPeriod: result.artwork.historical_period || result.artwork.historicalPeriod,
            culturalBackground: result.artwork.cultural_background || result.artwork.culturalBackground,
            politicalContext: result.artwork.political_context || result.artwork.politicalContext,
            philosophicalContext: result.artwork.philosophical_context || result.artwork.philosophicalContext,
            theme: result.artwork.theme,
            narrative: result.artwork.narrative,
            symbols: result.artwork.symbols,
            subjectType: result.artwork.subject_type || result.artwork.subjectType,
            origin: result.artwork.origin,
            ownershipHistory: result.artwork.ownership_history || result.artwork.ownershipHistory,
            currentLocation: result.artwork.current_location || result.artwork.currentLocation,
            estimatedValue: result.artwork.estimated_value || result.artwork.estimatedValue,
            exhibitions: result.artwork.exhibitions,
            marketTrends: result.artwork.market_trends || result.artwork.marketTrends,
            popularityMetrics: result.artwork.popularity_metrics || result.artwork.popularityMetrics,
            criticalReception: result.artwork.critical_reception || result.artwork.criticalReception,
            culturalImpact: result.artwork.cultural_impact || result.artwork.culturalImpact,
            currentSignificance: result.artwork.current_significance || result.artwork.currentSignificance,
            hasDigitalReconstruction: result.artwork.has_digital_reconstruction || result.artwork.hasDigitalReconstruction,
            digitalInsights: result.artwork.digital_insights || result.artwork.digitalInsights,
            aiAnalysis: result.artwork.ai_analysis || result.artwork.aiAnalysis,
            scholarlyAnalysis: result.artwork.scholarly_analysis || result.artwork.scholarlyAnalysis,
            relatedWorks: result.artwork.related_works || result.artwork.relatedWorks,
            purpose: result.artwork.purpose,
            inspiration: result.artwork.inspiration,
            intendedMessage: result.artwork.intended_message || result.artwork.intendedMessage,
            funFacts: result.artwork.fun_facts || result.artwork.funFacts,
            artistSignature: result.artwork.artist_signature || result.artwork.artistSignature,
            createdAt: result.artwork.created_at || result.artwork.createdAt,
            updatedAt: result.artwork.updated_at || result.artwork.updatedAt,
            uploadedBy: result.artwork.uploaded_by || result.artwork.uploadedBy,
            ownerId: result.artwork.owner_id || result.artwork.ownerId,
            isPublic: result.artwork.is_public || result.artwork.isPublic,
            originalFilename: result.artwork.original_filename || result.artwork.originalFilename,
            // Ensure nested analysis object is also mapped if needed
            analysis: result.artwork.analysis ? {
                id: result.artwork.analysis.id,
                artworkId: result.artwork.analysis.artwork_id || result.artwork.analysis.artworkId,
                style: result.artwork.analysis.style,
                subject: result.artwork.analysis.subject,
                colorPalette: result.artwork.analysis.color_palette || result.artwork.analysis.colorPalette,
                composition: result.artwork.analysis.composition,
                technique: result.artwork.analysis.technique,
                historicalContext: result.artwork.analysis.historical_context || result.artwork.analysis.historicalContext,
                artistIntent: result.artwork.analysis.artist_intent || result.artwork.analysis.artistIntent,
                emotionalResponse: result.artwork.analysis.emotional_response || result.artwork.analysis.emotionalResponse,
                keywords: result.artwork.analysis.keywords,
                confidenceScore: result.artwork.analysis.confidence_score || result.artwork.analysis.confidenceScore,
                rawAnalysisData: result.artwork.analysis.raw_analysis_data || result.artwork.analysis.rawAnalysisData,
                createdAt: result.artwork.analysis.created_at || result.artwork.analysis.createdAt,
            } : undefined,
             // Map other potential snake_case fields not explicitly listed above
             marketValue: result.artwork.market_value || result.artwork.marketValue,
             exhibitionHistory: result.artwork.exhibition_history || result.artwork.exhibitionHistory,
             relatedArtworks: result.artwork.related_artworks || result.artwork.relatedArtworks,
             childArtworks: result.artwork.child_artworks || result.artwork.childArtworks,
        };


        onAnalysisComplete(formattedResult);

      } catch (error) {
        logError('ArtAnalyzer: Error during artwork analysis:', error);
        onError(error instanceof Error ? error.message : 'An unknown error occurred during analysis.');
      }
    };

    analyzeArtwork();

  }, [file, token, onAnalysisComplete, onError]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 min-h-[300px]">
      <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Analyzing Artwork...</h2>
      <p className="text-gray-500">{progressMessage}</p>
      {file && (
        <div className="mt-4 text-sm text-gray-600">
          Analyzing: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}
    </div>
  );
}
