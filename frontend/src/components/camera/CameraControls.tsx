import React from 'react';
import { Camera, StopCircle } from 'lucide-react';

interface Props {
  onStart: () => Promise<void>;
  onStop: () => void;
  onCapture: () => string;
  isLoading: boolean;
  setPhoto: (photo: string) => void;
}

export function CameraControls({ onStart, onStop, onCapture, isLoading, setPhoto }: Props) {
  const [isActive, setIsActive] = React.useState(false);

  const handleStart = async () => {
    await onStart();
    setIsActive(true);
  };

  const handleStop = () => {
    onStop();
    setIsActive(false);
  };

  const handleCapture = () => {
    const photo = onCapture();
    setPhoto(photo);
  };

  return (
    <div className="flex justify-center gap-4">
      {!isActive ? (
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Camera className="w-5 h-5" />
          Start Camera
        </button>
      ) : (
        <>
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <StopCircle className="w-5 h-5" />
            Stop Camera
          </button>
          <button
            onClick={handleCapture}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Take Photo
          </button>
        </>
      )}
    </div>
  );
}
