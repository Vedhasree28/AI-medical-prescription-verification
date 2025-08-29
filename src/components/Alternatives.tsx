import React, { useState } from 'react';
import { findAlternativeMedications } from '../services/aiService';
import { AlternativeResult } from '../types';
import Loader from './common/Loader';

const Alternatives: React.FC = () => {
  const [drugName, setDrugName] = useState<string>('');
  const [age, setAge] = useState<number>(45);
  const [condition, setCondition] = useState<string>('');
  const [results, setResults] = useState<AlternativeResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName) {
      setError('Please enter a medication name.');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const data = await findAlternativeMedications(drugName, age, condition);
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
        <i className="fa-solid fa-sync-alt text-blue-500"></i>
        Alternative Medication Suggestions
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="input-alt-drug-name" className="font-semibold text-slate-200">Current Medication</label>
          <input
            id="input-alt-drug-name"
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full mt-1 rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Ibuprofen"
            required
          />
        </div>
        <div>
          <label htmlFor="input-alt-age" className="font-semibold text-slate-200">Patient Age: {age}</label>
          <input
            id="input-alt-age"
            type="range"
            min="0"
            max="120"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
            className="w-full mt-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="input-condition" className="font-semibold text-slate-200">Medical Condition (optional)</label>
          <input
            id="input-condition"
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full mt-1 rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Arthritis"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow disabled:bg-slate-400 transition-colors flex items-center gap-2"
        >
          {loading ? <><i className="fa-solid fa-spinner animate-spin"></i>Finding...</> : <><i className="fa-solid fa-search"></i>Find Alternatives</>}
        </button>
      </form>

      {error && <div className="p-4 bg-red-500/20 text-red-300 rounded-md shadow">{error}</div>}
      
      {loading && <Loader message="Searching for alternatives with AI..." />}

      {results && (
        <div className="mt-6 space-y-4">
           <h3 className="text-xl font-semibold text-slate-200">Suggested Alternatives for {drugName}</h3>
          {results.length > 0 ? (
            results.map((alt, index) => (
              <div key={index} className="p-4 border-l-4 rounded-r-lg shadow-md bg-blue-500/10 border-blue-500 text-blue-300 backdrop-blur-sm">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-blue-200">
                   <i className="fa-solid fa-pills"></i>
                   {alt.alternative}
                </h4>
                <p><strong className="text-blue-200">Reason:</strong> {alt.reason}</p>
                <p className="mt-1"><strong className="text-blue-200">Potential Benefits:</strong> {alt.potentialBenefits}</p>
              </div>
            ))
          ) : (
            <div className="p-4 border-l-4 rounded-r-lg shadow-md bg-yellow-500/10 border-yellow-500 text-yellow-300 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                <i className="fa-solid fa-circle-info"></i>
                No Alternatives Found
              </h4>
              <p>Our AI could not find suitable alternatives based on the input. Please consult a healthcare professional.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Alternatives;