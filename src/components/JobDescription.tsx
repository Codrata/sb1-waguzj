import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface JobDescriptionProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

function JobDescription({ onSubmit, isLoading }: JobDescriptionProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Enter Job Description
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !description.trim()}
          className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Send className="mr-2" />
              Analyze
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default JobDescription;