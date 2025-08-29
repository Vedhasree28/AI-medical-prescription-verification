import React, { useState } from 'react';
import { ActiveSection } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import DrugInteractions from './components/DrugInteractions';
import DosageCalculator from './components/DosageCalculator';
import Alternatives from './components/Alternatives';
import TextAnalysis from './components/TextAnalysis';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(ActiveSection.Dashboard);

  const renderSection = () => {
    switch (activeSection) {
      case ActiveSection.Dashboard:
        return <Dashboard setActiveSection={setActiveSection} />;
      case ActiveSection.Interactions:
        return <DrugInteractions />;
      case ActiveSection.Dosage:
        return <DosageCalculator />;
      case ActiveSection.Alternatives:
        return <Alternatives />;
      case ActiveSection.TextAnalysis:
        return <TextAnalysis />;
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-200">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          <div className="md:col-span-3">
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
          <div className="md:col-span-9">
            <section
              aria-atomic="true"
              aria-live="polite"
              className="bg-slate-900/30 backdrop-blur-sm rounded-lg shadow-lg p-6 overflow-auto content-scroll max-h-[calc(100vh-180px)]"
              id="content-area"
              tabIndex={0}
            >
              {renderSection()}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;