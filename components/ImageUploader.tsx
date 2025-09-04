
import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 10;

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload JPG, PNG, or WEBP.');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`);
      return;
    }
    onImageUpload(file);
  }, [onImageUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
    }
  };

  const onBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">Unleash Your Vision</h1>
      <p className="text-lg text-slate-400 mb-8">Turn any image into a masterpiece prompt.</p>

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed rounded-xl transition-colors duration-300 ${
          isDragging ? 'border-indigo-400 bg-slate-800/50' : 'border-slate-600 bg-slate-800/20'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <UploadIcon className="w-12 h-12 text-slate-500" />
          <p className="text-slate-300">
            <span className="font-semibold text-indigo-400 cursor-pointer" onClick={onBrowseClick}>Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">JPG, PNG, or WEBP (Max 10MB)</p>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept={ALLOWED_TYPES.join(',')}
            className="hidden"
        />
      </div>
       {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
};
