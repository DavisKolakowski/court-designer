import React, { useState } from 'react';
import { Modal, Button, Input } from './ui';
import { CourtType, CourtOverlays } from '../types/court';

interface EmailDesignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courtType: CourtType;
  appliedColors: Record<string, string>;
  selectedColor: string;
  showAccessories: boolean;
  overlays: CourtOverlays;
}

export const EmailDesignDialog: React.FC<EmailDesignDialogProps> = ({
  isOpen,
  onClose,
  courtType,
  appliedColors,
  selectedColor,
  showAccessories,
  overlays
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateCourtSpecs = () => {
    const courtName = courtType.charAt(0).toUpperCase() + courtType.slice(1);
    const overlayList = Object.entries(overlays)
      .filter(([_, enabled]) => enabled)
      .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1))
      .join(', ') || 'None';

    const appliedColorsList = Object.entries(appliedColors)
      .map(([key, color]) => `${key}: ${color}`)
      .join('\n') || 'No custom colors applied';

    return `Court Design Specifications:

Court Type: ${courtName}
Current Selected Color: ${selectedColor}
Applied Colors:
${appliedColorsList}

Accessories: ${showAccessories ? 'Enabled' : 'Disabled'}
Court Overlays: ${overlayList}

Generated on: ${new Date().toLocaleDateString()}
Customer Email: ${email}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setEmailError('');

    try {
      const courtSpecs = generateCourtSpecs();
      const subject = `Court Design Request - ${courtType.charAt(0).toUpperCase() + courtType.slice(1)} Court`;
      
      // Create mailto link
      const body = encodeURIComponent(courtSpecs);
      const mailto = `mailto:reagankola@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // Open email client
      window.location.href = mailto;
      
      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
        setEmail('');
      }, 1000);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Email Court Design" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-gray-600 mb-4">
            Enter your email address to send your court design specifications to our team.
          </p>
          
          <Input
            label="Your Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="your.email@example.com"
            required
            error={emailError}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Design Specifications Preview</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Court Type:</strong> {courtType.charAt(0).toUpperCase() + courtType.slice(1)}</p>
            <p><strong>Selected Color:</strong> {selectedColor}</p>
            <p><strong>Accessories:</strong> {showAccessories ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Applied Colors:</strong> {Object.keys(appliedColors).length} custom colors</p>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !email}
            className="flex-1"
          >
            {isSubmitting ? 'Sending...' : 'Send Design Request'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
