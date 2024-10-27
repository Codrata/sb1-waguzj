import React, { useCallback } from 'react';
import { FileUp } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

function FileUpload({ onFileUpload }: FileUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div 
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <FileUp className="w-12 h-12 text-indigo-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Upload Your Resume</h2>
      <p className="text-gray-500 mb-4 text-center">
        Drag and drop your resume here or click to browse
        <br />
        Supported formats: PDF, DOC, DOCX
      </p>
      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />
        <span className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Browse Files
        </span>
      </label>
    </div>
  );
}

export default FileUpload;