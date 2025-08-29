import React from 'react';
import { ActiveSection } from '../types';

interface DashboardProps {
  setActiveSection: (section: ActiveSection) => void;
}

const InfoCard: React.FC<{ icon: string; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
  <div className="border border-slate-600 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow backdrop-blur-sm">
    <h3 className="text-lg font-semibold mb-2 text-slate-100 flex items-center gap-2">
      <i className={`fa-solid ${icon} text-blue-500`}></i>
      {title}
    </h3>
    <p className="text-slate-300 text-sm">{children}</p>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ setActiveSection }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-slate-700">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <i className="fa-solid fa-house-medical text-blue-500"></i>
          Medical Prescription Dashboard
        </h2>
        <p className="mt-1 text-slate-300">Welcome! Use the tools below to ensure medication safety and accuracy.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard icon="fa-pills" title="Drug Safety">
          Check for harmful drug interactions and ensure patient safety.
        </InfoCard>
        <InfoCard icon="fa-calculator" title="Dosage Guidance">
          Get age-appropriate dosage recommendations powered by AI.
        </InfoCard>
        <InfoCard icon="fa-sync-alt" title="Alternatives">
          Find safer medication options when interactions are detected.
        </InfoCard>
      </div>

      <hr className="my-6 border-slate-700" />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-slate-200">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveSection(ActiveSection.Interactions)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-triangle-exclamation"></i>
            Check Drug Interactions
          </button>
          <button
            onClick={() => setActiveSection(ActiveSection.TextAnalysis)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-file-medical"></i>
            Analyze Prescription Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;