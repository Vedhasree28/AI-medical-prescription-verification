import React, { useState } from 'react';
import { extractInfoFromText } from '../services/aiService';
import { ExtractedInfo } from '../types';
import Loader from './common/Loader';

const TextAnalysis: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<ExtractedInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      setError('Please enter some medical text to analyze.');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const data = await extractInfoFromText(text);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
        <i className="fa-solid fa-file-medical text-blue-500"></i>
        NLP-Based Drug Information Extraction
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="input-medical-text" className="font-semibold text-slate-200">
          Paste medical text or prescription
        </label>
        <textarea
          id="input-medical-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Patient to take aspirin 100mg daily and ibuprofen 200mg every 6 hours as needed for pain"
          rows={6}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow disabled:bg-slate-400 transition-colors flex items-center gap-2"
        >
          {loading ? <><i className="fa-solid fa-spinner animate-spin"></i>Extracting...</> : <><i className="fa-solid fa-search"></i>Extract Information</>}
        </button>
      </form>

      {error && <div className="p-4 bg-red-500/20 text-red-300 rounded-md shadow">{error}</div>}

      {loading && <Loader message="Analyzing text with AI..." />}

      {results && (
        <div className="mt-6 p-4 border-l-4 rounded-r-lg shadow-md bg-green-500/10 border-green-500 text-green-300 backdrop-blur-sm">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i>
            Extracted Information
          </h4>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((info, index) => (
                <div key={index} className="bg-slate-900/40 p-3 rounded-lg border border-green-600">
                  <p className="font-bold text-green-200">{info.drugName}</p>
                  <ul className="text-sm text-green-300 mt-1 list-disc list-inside">
                    {info.dosage && <li><strong>Dosage:</strong> {info.dosage}</li>}
                    {info.frequency && <li><strong>Frequency:</strong> {info.frequency}</li>}
                    {info.duration && <li><strong>Duration:</strong> {info.duration}</li>}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-green-300">No specific medication information could be extracted from the provided text.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TextAnalysis;