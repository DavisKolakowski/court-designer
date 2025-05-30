import { useNavigate } from "react-router-dom";
import { CourtType } from "../types/court";
import { FaMedal } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCourtSelect = (court: CourtType) => {
    navigate(`/${court}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        {/* Court icon placeholder */}
        <div className="w-24 h-24 bg-gray-200 rounded-2xl mx-auto mb-8 flex items-center justify-center">
          <FaMedal className="w-12 h-12 text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Design Your Court</h1>
        
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Select a court type below to begin designing your sport's court design. Choose paint colors and overlay additional court lines.
        </p>
        
        {/* Court Selection Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={() => handleCourtSelect('basketball')}
            className="flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-orange-200 hover:border-orange-300"
          >
            <span className="w-6 h-6 bg-orange-500 rounded-full mr-3"></span>
            <span className="text-lg font-medium text-gray-800">Basketball</span>
          </button>
          
          <button
            onClick={() => handleCourtSelect('tennis')}
            className="flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-300"
          >
            <span className="w-6 h-6 bg-green-500 rounded-full mr-3"></span>
            <span className="text-lg font-medium text-gray-800">Tennis</span>
          </button>
          
          <button
            onClick={() => handleCourtSelect('pickleball')}
            className="flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-purple-200 hover:border-purple-300"
          >
            <span className="w-6 h-6 bg-purple-500 rounded-full mr-3"></span>
            <span className="text-lg font-medium text-gray-800">Pickleball</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
