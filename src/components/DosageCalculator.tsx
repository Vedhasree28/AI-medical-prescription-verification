import React, { useState } from 'react';
import { getDosageRecommendation } from '../services/aiService';
import { DosageResult } from '../types';
import Loader from './common/Loader';

const DosageCalculator: React.FC = () => {
  const [drugName, setDrugName] = useState<string>('');
  const [age, setAge] = useState<number>(45);
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<DosageResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drugName) {
      setError('Please enter a drug name.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const weightNum = weight ? parseFloat(weight) : undefined;
      const data = await getDosageRecommendation(drugName, age, weightNum);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
        <i className="fa-solid fa-calculator text-blue-500"></i>
        Age-Specific Dosage Recommendation
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="input-drug-name" className="font-semibold text-slate-200">Drug Name</label>
          <input
            id="input-drug-name"
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full mt-1 rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Acetaminophen"
            required
          />
        </div>
        <div>
          <label htmlFor="input-age" className="font-semibold text-slate-200">Patient Age: {age}</label>
          <input
            id="input-age"
            type="range"
            min="0"
            max="120"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
            className="w-full mt-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label htmlFor="input-weight" className="font-semibold text-slate-200">Weight (kg, optional)</label>
          <input
            id="input-weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
            className="w-full mt-1 rounded-md border border-slate-600 bg-slate-900/50 text-slate-100 placeholder:text-slate-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 70"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow disabled:bg-slate-400 transition-colors flex items-center gap-2"
        >
          {loading ? <><i className="fa-solid fa-spinner animate-spin"></i>Calculating...</> : <><i className="fa-solid fa-pills"></i>Calculate Dosage</>}
        </button>
      </form>

      {error && <div className="p-4 bg-red-500/20 text-red-300 rounded-md shadow">{error}</div>}

      {loading && <Loader message="Calculating dosage with AI..." />}

      {result && (
        <div className="mt-6 p-4 border-l-4 rounded-r-lg shadow-md bg-green-500/10 border-green-500 text-green-300 backdrop-blur-sm">
          <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i>
            Dosage Recommendation for {result.drugName}
          </h4>
          <div className="space-y-2 text-green-200">
            <p><strong className="text-green-100">Age Group:</strong> {result.ageGroup}</p>
            <p><strong className="text-green-100">Recommended Dosage:</strong> {result.recommendedDosage}</p>
            <p><strong className="text-green-100">Max Daily Dose:</strong> {result.maxDailyDosage}</p>
            <p><strong className="text-green-100">Considerations:</strong> {result.considerations}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DosageCalculator;