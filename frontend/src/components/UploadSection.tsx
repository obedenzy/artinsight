import React from 'react';
import { Image as ImageIcon, Camera } from 'lucide-react';
import { CameraCapture } from './camera/CameraCapture';
import { FileUpload } from './upload/FileUpload';

interface Props {
  onFileSelect: (file: File) => void;
}

export function UploadSection({ onFileSelect }: Props) {
  const [uploadMethod, setUploadMethod] = React.useState<'camera' | 'file' | null>(null);

  // Add a log to check if the prop is received correctly
  console.log("UploadSection received onFileSelect:", typeof onFileSelect);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload Your Artwork</h2>
        <p className="text-gray-600">
          Discover the secrets behind any artwork through AI analysis
        </p>
      </div>

      {!uploadMethod ? (
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => setUploadMethod('camera')}
            className="bg-white rounded-lg shadow-md p-8 hover:bg-purple-50 transition-colors group"
          >
            <div className="flex flex-col items-center gap-4">
              <Camera className="w-12 h-12 text-purple-600" />
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600">
                  Use Camera
                </h3>
                <p className="text-gray-600">
                  Take a photo of artwork using your device's camera
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setUploadMethod('file')}
            className="bg-white rounded-lg shadow-md p-8 hover:bg-purple-50 transition-colors group"
          >
            <div className="flex flex-col items-center gap-4">
              <ImageIcon className="w-12 h-12 text-purple-600" />
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600">
                  Upload File
                </h3>
                <p className="text-gray-600">
                  Select an image file from your device
                </p>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setUploadMethod(null)}
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              ← Change upload method
            </button>
            <div className="bg-purple-100 px-3 py-1 rounded-full text-purple-700">
              {uploadMethod === 'camera' ? 'Using Camera' : 'File Upload'}
            </div>
          </div>

          {uploadMethod === 'camera' ? (
            // Pass onFileSelect to CameraCapture as well if needed, assuming it has an 'onCapture' prop
            <CameraCapture onCapture={onFileSelect} />
          ) : (
            // Ensure onFileSelect is passed to FileUpload
            <FileUpload onFileSelect={onFileSelect} />
          )}
        </div>
      )}
    </div>
  );
}
