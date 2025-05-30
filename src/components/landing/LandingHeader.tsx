import React from 'react';
import { FaMedal } from 'react-icons/fa';

interface LandingHeaderProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({
  title = "Design Your Court",
  subtitle = "Select a court type below to begin designing your sport's court design. Choose paint colors and overlay additional court lines.",
  icon,
  className = ""
}) => {
  const defaultIcon = (
    <div className="w-24 h-24 bg-gray-200 rounded-2xl mx-auto mb-8 flex items-center justify-center">
      <FaMedal className="w-12 h-12 text-gray-400" />
    </div>
  );

  return (
    <header className={`text-center ${className}`}>
      {icon || defaultIcon}
      
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{title}</h1>
      
      <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
        {subtitle}
      </p>
    </header>
  );
};

export default LandingHeader;
