import React, { useRef, useState, useEffect } from 'react'; // Added useEffect
import { Upload, File, Video, Image as ImageIcon, X } from 'lucide-react';

interface Props {
  onFilesSelected: (files: File[]) => void;
}

export function ProofOfAuthorshipUpload({ onFilesSelected }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // State for preview URLs
  const [files, setFiles] = useState<File[]>([]); // Added to store the actual files

  // Cleanup effect for object URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

    const handleFiles = (fileList: FileList) => {
        const newFiles: File[] = [];
        const newPreviewUrls: string[] = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                newFiles.push(file);
                newPreviewUrls.push(URL.createObjectURL(file));
            } else {
                alert(`File "${file.name}" is not a valid image or video file.`);
            }
        }
        // Update both files and previewUrls states
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
        onFilesSelected([...files, ...newFiles]); // Send all files to parent
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        const removedFile = newFiles.splice(index, 1)[0]; // Remove the file
        setFiles(newFiles);

        const newPreviewUrls = [...previewUrls];
        const removedUrl = newPreviewUrls.splice(index, 1)[0]; // Remove the URL
        setPreviewUrls(newPreviewUrls);
        URL.revokeObjectURL(removedUrl); // Revoke the object URL

        onFilesSelected(newFiles); // Update parent with the new file list
    };


  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Kid's Progress Art Activity</h2> {/* Added Header */}
      <div
        className={`border-4 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload className="w-16 h-16 text-gray-400" />
          <p className="text-xl font-medium">
            Drag and drop images/video here, or click to select files
          </p>
          <p className="text-gray-500">
            Supported formats: JPG, PNG, WEBP, MP4, MOV (max total size: 20MB)
          </p>
          <button
            onClick={handleButtonClick}
            type="button"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Choose Files</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*"
            multiple
            onChange={handleChange}
          />
        </div>
      </div>

        {/* Preview Section */}
      {previewUrls.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => {
                const file = files[index];
                return (
                    <div key={index} className="relative">
                        {file.type.startsWith('image/') ? (
                            <img src={url} alt={`Preview ${index}`} className="w-full h-48 object-cover rounded-lg" />
                        ) : (
                            <video src={url} controls className="w-full h-48 object-cover rounded-lg" />
                        )}
                        <button
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                            title="Remove"
                        >
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
