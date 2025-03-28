import React, { useRef } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

interface Props {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: Props) {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, or WEBP)');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    console.log("Calling onFileSelect with:", file); // Log before calling
    onFileSelect(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border-4 border-dashed rounded-lg p-8 text-center transition-colors
        ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <ImageIcon className="w-16 h-16 text-gray-400" />
        <p className="text-xl font-medium">
          Drag and drop your artwork here
        </p>
        <p className="text-gray-500">
          or
        </p>
        <button
          onClick={handleButtonClick}
          type="button"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="w-5 h-5" />
          <span>Choose File</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
        />
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, WEBP (max 10MB)
        </p>
      </div>
    </div>
  );
}
