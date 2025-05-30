import React from 'react';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  title?: string;
  subtitle?: string;
  isMobile?: boolean;
  onClose?: () => void;
  className?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  title = "Customize Your Court",
  subtitle = "Choose colors and toggle accessories",
  isMobile = false,
  onClose,
  className = ""
}) => {
  return (
    <header className={`p-4 md:p-6 border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h2>
          <p className="text-sm text-gray-600 truncate">{subtitle}</p>
        </div>
        
        {/* Mobile close button */}
        {isMobile && onClose && (
          <button 
            onClick={onClose}
            className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default SidebarHeader;
