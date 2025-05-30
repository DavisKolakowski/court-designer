import { useNavigate } from "react-router-dom";
import { CourtType } from "../../types/court";
import LandingHeader from "./LandingHeader";
import CourtSelectionGrid from "../shared/CourtSelectionGrid";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCourtSelect = (court: CourtType) => {
    navigate(`/${court}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <LandingHeader />
        <CourtSelectionGrid onCourtSelect={handleCourtSelect} />
      </div>
    </div>
  );
};

export default LandingPage;
