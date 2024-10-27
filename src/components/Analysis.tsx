import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AnalysisProps {
  analysis: {
    relevantSkills: string[];
    suggestedModifications: string[];
    coverLetterDraft: string;
  };
}

function Analysis({ analysis }: AnalysisProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Analysis Results</h2>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="flex items-center text-lg font-medium text-green-800 mb-2">
          <CheckCircle className="w-5 h-5 mr-2" />
          Relevant Skills Identified
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.relevantSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="flex items-center text-lg font-medium text-amber-800 mb-2">
          <AlertCircle className="w-5 h-5 mr-2" />
          Suggested Modifications
        </h3>
        <ul className="list-disc list-inside space-y-2">
          {analysis.suggestedModifications.map((mod, index) => (
            <li key={index} className="text-amber-800">
              {mod}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analysis;