import React from 'react';
import { FileDown } from 'lucide-react';

interface TailoredOutputProps {
  resume: File | null;
  jobDescription: string;
  analysis: {
    coverLetterDraft: string;
  };
}

function TailoredOutput({ resume, jobDescription, analysis }: TailoredOutputProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Tailored Documents</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Cover Letter Draft</h3>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-gray-600">
            {analysis.coverLetterDraft}
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <FileDown className="w-4 h-4 mr-2" />
          Download Cover Letter
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Tailored Resume</h3>
        <p className="text-gray-600">
          Your resume has been optimized based on the job description and analysis.
        </p>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          <FileDown className="w-4 h-4 mr-2" />
          Download Tailored Resume
        </button>
      </div>
    </div>
  );
}

export default TailoredOutput;