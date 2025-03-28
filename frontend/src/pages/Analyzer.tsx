import React, { useState } from 'react';
import { UploadSection } from '../components/UploadSection';
import { ArtAnalyzer } from '../components/analysis/ArtAnalyzer';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { DetailedArtwork } from '../types/artwork';
// Import AnalysisState directly from its definition file
import { AnalysisState } from '../components/analysis/analysisStates';

type AnalyzerStatus = 'idle' | 'analyzing' | 'results' | 'error';

export function Analyzer() {
  const [status, setStatus] = useState<AnalyzerStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DetailedArtwork | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    console.log("File selected in Analyzer page:", file.name);
    setSelectedFile(file);
    setStatus('analyzing');
    setError(null); // Clear previous errors
    setAnalysisResult(null); // Clear previous results
  };

  const handleAnalysisComplete = (result: DetailedArtwork) => {
    console.log("Analysis complete in Analyzer page:", result);
    setAnalysisResult(result);
    setStatus('results');
  };

  const handleAnalysisError = (errorMessage: string) => {
    console.error("Analysis error in Analyzer page:", errorMessage);
    setError(errorMessage);
    setStatus('error');
  };

  const handleReset = () => {
    setStatus('idle');
    setSelectedFile(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      {status === 'idle' && (
        <UploadSection onFileSelect={handleFileSelect} />
      )}

      {status === 'analyzing' && selectedFile && (
        <ArtAnalyzer
          file={selectedFile}
          onAnalysisComplete={handleAnalysisComplete}
          onError={handleAnalysisError}
        />
      )}

      {status === 'results' && analysisResult && (
        <AnalysisResults result={analysisResult} onReset={handleReset} />
      )}

      {status === 'error' && (
        <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="text-xl font-semibold mb-2">Analysis Failed</h2>
          <p className="mb-4">{error || 'An unknown error occurred.'}</p>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
