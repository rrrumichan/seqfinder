
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  file: File | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, file }) => {
  const [isDragging, setIsDragging] = useState(false);

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`flex justify-center items-center w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200
          ${isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
      >
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".fasta,.fa,.fna,.ffn,.faa,.frn"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" className="w-full text-center cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadIcon className="w-10 h-10 text-gray-400" />
            <p className="font-semibold text-gray-600">
              여기에 FASTA 파일을 드래그하거나 클릭하여 업로드하세요.
            </p>
            <p className="text-xs text-gray-500">(.fasta, .fa, .fna 등)</p>
          </div>
        </label>
      </div>
      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <p>선택된 파일: <span className="font-semibold">{file.name}</span></p>
        </div>
      )}
    </div>
  );
};
