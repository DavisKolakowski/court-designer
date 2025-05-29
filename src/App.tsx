import { useState } from "react";
import LandingPage from "./components/LandingPage";
import CourtDesigner from "./components/CourtDesigner";
import { CourtType } from "./types/court";

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'designer'>('landing');
  const [selectedCourt, setSelectedCourt] = useState<CourtType>('basketball');

  const handleCourtSelect = (court: CourtType) => {
    setSelectedCourt(court);
    setCurrentView('designer');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'landing' ? (
        <LandingPage onCourtSelect={handleCourtSelect} />
      ) : (
        <CourtDesigner 
          selectedCourt={selectedCourt}
          onBackToLanding={handleBackToLanding}
        />
      )}
    </div>
  );
}

export default App;
