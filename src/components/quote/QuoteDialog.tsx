import React, { useState } from 'react';
import { Modal, Button } from '../ui';
import { CourtType, CourtOverlays } from '../../types/court';
import ContactInformationForm, { ContactMethod } from '../quote/ContactInformationForm';
import DesignSummaryDisplay from '../quote/DesignSummaryDisplay';
import { generateQuoteRequest } from '../../utils/quoteGenerator';
import { appConfig } from '../../config/app';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courtType: CourtType;
  appliedColors: Record<string, string>;
  showAccessories: boolean;
  overlays: CourtOverlays;
  designSummary?: Record<string, any>;
}

const QuoteDialog: React.FC<QuoteDialogProps> = ({
  isOpen,
  onClose,
  courtType,
  appliedColors,
  showAccessories,
  overlays,
  designSummary
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<ContactMethod>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      const quoteRequest = generateQuoteRequest({
        email,
        phone,
        preferredContact,
        courtType,
        appliedColors,
        showAccessories,
        overlays,
        designSummary
      });
      
      const subject = `Quote Request - ${courtType.charAt(0).toUpperCase() + courtType.slice(1)} Court Design`;
        // Create mailto link
      const body = encodeURIComponent(quoteRequest);
      const mailto = `mailto:${appConfig.quoteEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // Open email client
      window.location.href = mailto;
      
      // Close dialog after a short delay
      setTimeout(() => {
        handleClose();
      }, 1000);
      
    } catch (error) {
      console.error('Error sending quote request:', error);
      setEmailError('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPhone('');
    setPreferredContact('email');
    setEmailError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request Quote" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="text-gray-600 mb-6">
            Fill out the form below to request a detailed quote for your custom court design. 
            Our team will review your specifications and provide pricing information.
          </p>
          
          <ContactInformationForm
            email={email}
            phone={phone}
            preferredContact={preferredContact}
            emailError={emailError}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onPreferredContactChange={setPreferredContact}
          />
        </div>

        <DesignSummaryDisplay
          courtType={courtType}
          appliedColors={appliedColors}
          showAccessories={showAccessories}
          overlays={overlays}
          designSummary={designSummary}
        />

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
            {isSubmitting ? 'Sending Request...' : 'Request Quote'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default QuoteDialog;
