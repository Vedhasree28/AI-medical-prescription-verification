import React, { useState } from 'react';
import { analyzeDrugInteractions } from '../services/aiService';
import { InteractionResult } from '../types';
import Loader from './common/Loader';

const DrugInteractions: React.FC = () => {
  const [drugs, setDrugs] = useState<string>('');
  const [results, setResults] = useState<InteractionResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const drugList = drugs.split(',').map(d => d.trim()).filter(Boolean);
    if (drugList.length < 2) {
      setError('Please enter at least two drug names separated by commas.');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const data = await analyzeDrugInteractions(drugList);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500/10 border-red-500 text-red-300 backdrop-blur-sm';
      case 'medium': return 'bg-yellow-500/10 border-yellow-500 text-yellow-300 backdrop-blur-sm';
      case 'low': return 'bg-green-500/10 border-green-500 text-green-300 backdrop-blur-sm';
      default: return 'bg-blue-500/10 border-blue-500 text-blue-300 backdrop-blur-sm';
    }
  };
  
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'fa-triangle-exclamation';
      case 'medium': return 'fa-circle-exclamation';
      case 'low': return 'fa-circle-info';
      default: return 'fa-check-circle';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
        <i className="fa-solid fa-pills text-blue-500"></i>
        Drug Interaction Detection System
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="input-drugs" className="font-semibold text-slate-200">
          Enter drug names (separated by commas)
        </label>
        <textarea
          id="input-drugs"
          value={drugs}
          onChange={(e) => setDrugs(e.target.value)}
          className="w-full resize-none rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Aspirin, Ibuprofen, Warfarin"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow disabled:bg-slate-400 transition-colors flex items-center gap-2"
        >
          {loading ? <><i className="fa-solid fa-spinner animate-spin"></i>Analyzing...</> : <><i className="fa-solid fa-magnifying-glass"></i>Analyze Interactions</>}
        </button>
      </form>

      {error && <div className="p-4 bg-red-500/20 text-red-300 rounded-md shadow">{error}</div>}

      {loading && <Loader message="Analyzing drug interactions with AI..." />}
      
      {results && (
        <div className="mt-6 space-y-4">
          {results.length > 0 ? (
            results.map((interaction, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-r-lg shadow-md ${getSeverityClass(interaction.severity)}`}>
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                   <i className={`fa-solid ${getSeverityIcon(interaction.severity)}`}></i>
                   {interaction.severity} Risk Interaction: {interaction.drugs.join(' + ')}
                </h4>
                <p><strong>Description:</strong> {interaction.description}</p>
                <p className="mt-1"><strong>Recommendation:</strong> {interaction.recommendation}</p>
              </div>
            ))
          ) : (
             <div className="p-4 border-l-4 rounded-r-lg shadow-md bg-green-500/10 border-green-500 text-green-300">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-check-circle"></i>
                  No Significant Interactions Found
                </h4>
                <p>Based on the provided drug list, our AI model did not detect any significant interactions. Always consult a healthcare professional for final verification.</p>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugInteractions;