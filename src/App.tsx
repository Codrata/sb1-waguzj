import React, { useState } from 'react';
import { FileUp, FileDown, Briefcase, Send, Loader2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import JobDescription from './components/JobDescription';
import Analysis from './components/Analysis';
import TailoredOutput from './components/TailoredOutput';
import { analyzeResume, extractTextFromPDF } from './lib/api';

function App() {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setResume(file);
      const text = await extractTextFromPDF(file);
      setResumeText(text);
      setStep(2);
    } catch (error) {
      setError('Error reading PDF file. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleJobDescriptionSubmit = async (description: string) => {
    setJobDescription(description);
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeResume(resumeText, description);
      setAnalysis(result.analysis);
      setStep(3);
    } catch (error) {
      setError('Error analyzing resume. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">ResumeTailor</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <Step number={1} title="Upload Resume" active={step === 1} completed={step > 1} />
            <Step number={2} title="Job Description" active={step === 2} completed={step > 2} />
            <Step number={3} title="Analysis & Output" active={step === 3} completed={step > 3} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {step === 1 && (
            <FileUpload onFileUpload={handleFileUpload} />
          )}

          {step === 2 && (
            <JobDescription 
              onSubmit={handleJobDescriptionSubmit}
              isLoading={isAnalyzing}
            />
          )}

          {step === 3 && analysis && (
            <div className="space-y-8">
              <Analysis analysis={analysis} />
              <TailoredOutput 
                resume={resume}
                jobDescription={jobDescription}
                analysis={analysis}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Step({ number, title, active, completed }: { 
  number: number; 
  title: string; 
  active: boolean; 
  completed: boolean;
}) {
  return (
    <div className="flex items-center">
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-full
        ${completed ? 'bg-green-500' : active ? 'bg-indigo-600' : 'bg-gray-200'}
        text-white font-semibold
      `}>
        {number}
      </div>
      <span className={`ml-2 ${active ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
}

export default App;