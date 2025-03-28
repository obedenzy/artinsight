import React from 'react';

interface Props {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export function CameraPreview({ videoRef }: Props) {
  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 border-2 border-purple-400 border-dashed pointer-events-none" />
    </div>
  );
}
