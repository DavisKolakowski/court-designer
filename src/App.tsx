import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import CourtDesigner from "./components/CourtDesigner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/basketball" element={<CourtDesigner selectedCourt="basketball" />} />
          <Route path="/tennis" element={<CourtDesigner selectedCourt="tennis" />} />
          <Route path="/pickleball" element={<CourtDesigner selectedCourt="pickleball" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
