import React from 'react';
import { ActiveSection } from '../types';

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const NavButton: React.FC<{
  section: ActiveSection;
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  icon: string;
  label: string;
}> = ({ section, activeSection, setActiveSection, icon, label }) => {
  const isActive = section === activeSection;
  return (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      <i className={`fa-solid ${icon} w-5 text-center`}></i>
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="bg-slate-900/30 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col h-full sidebar-scroll">
      <img
        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8eee701d-2077-4c40-a13b-c30cc91d228f.png"
        alt="Medical AI system logo"
        className="w-full h-auto object-contain mb-4 rounded"
      />
      <hr className="my-2 border-slate-700" />
      <nav className="flex flex-col space-y-2">
        <NavButton section={ActiveSection.Dashboard} activeSection={activeSection} setActiveSection={setActiveSection} icon="fa-house-medical" label="Dashboard" />
        <NavButton section={ActiveSection.Interactions} activeSection={activeSection} setActiveSection={setActiveSection} icon="fa-pills" label="Drug Interactions" />
        <NavButton section={ActiveSection.Dosage} activeSection={activeSection} setActiveSection={setActiveSection} icon="fa-calculator" label="Dosage Calculator" />
        <NavButton section={ActiveSection.Alternatives} activeSection={activeSection} setActiveSection={setActiveSection} icon="fa-sync-alt" label="Alternatives" />
        <NavButton section={ActiveSection.TextAnalysis} activeSection={activeSection} setActiveSection={setActiveSection} icon="fa-file-medical" label="Text Analysis" />
      </nav>
      <hr className="my-4 border-slate-700" />
      {/* FIX: Updated tech stack to reflect the actual implementation. */}
      
    </aside>
  );
};

export default Sidebar;