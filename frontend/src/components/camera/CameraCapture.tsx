import React, { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useCamera } from '../../hooks/useCamera';
import { CameraPreview } from './CameraPreview';
import { CameraControls } from './CameraControls';

export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const { startCamera, stopCamera, takePhoto, isLoading, error } = useCamera(videoRef);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Artwork Scanner</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {!photo ? (
          <>
            <CameraPreview videoRef={videoRef} />
            <CameraControls
              onStart={startCamera}
              onStop={stopCamera}
              onCapture={takePhoto}
              isLoading={isLoading}
              setPhoto={setPhoto}
            />
          </>
        ) : (
          <div className="space-y-4">
            <img
              src={photo}
              alt="Captured artwork"
              className="w-full rounded-lg shadow-md"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setPhoto(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retake Photo
              </button>
              <button
                onClick={() => {
                  // Handle photo analysis
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Analyze Artwork
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
