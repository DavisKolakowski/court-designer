import React from 'react';

interface MobileBackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
}

const MobileBackdrop: React.FC<MobileBackdropProps> = ({
  isVisible,
  onClick,
  className = ""
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-40 ${className}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};

export default MobileBackdrop;
