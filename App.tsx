
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptResult } from './components/PromptResult';
import { Spinner } from './components/Spinner';
import { generatePromptFromImage } from './services/geminiService';
import { convertFileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(null);
    setUploadedImage(null);

    try {
      const { base64, mimeType } = await convertFileToBase64(file);
      setUploadedImage(base64);

      const prompt = await generatePromptFromImage(base64, mimeType);
      setGeneratedPrompt(prompt);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setUploadedImage(null);
    setGeneratedPrompt(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto p-4 md:p-8 flex-grow flex flex-col items-center justify-center">
        {isLoading && <Spinner />}
        
        {!isLoading && error && (
          <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
            <h2 className="text-xl font-bold text-red-400">Generation Failed</h2>
            <p className="mt-2 text-red-300">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && !generatedPrompt && (
          <ImageUploader onImageUpload={handleImageUpload} />
        )}
        
        {!isLoading && !error && generatedPrompt && uploadedImage && (
          <PromptResult 
            imageSrc={uploadedImage} 
            prompt={generatedPrompt} 
            onReset={handleReset} 
          />
        )}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini API. Built for content creators.</p>
      </footer>
    </div>
  );
};

export default App;
