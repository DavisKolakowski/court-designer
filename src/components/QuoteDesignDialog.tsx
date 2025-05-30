import React, { useState } from 'react';
import { Modal, Button, Input } from './ui';
import { CourtType, CourtOverlays } from '../types/court';
import { getColorName } from '../data/colors';

interface QuoteDesignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  courtType: CourtType;
  appliedColors: Record<string, string>;
  selectedColor: string;
  showAccessories: boolean;
  overlays: CourtOverlays;
  designSummary?: Record<string, any>;
}

export const QuoteDesignDialog: React.FC<QuoteDesignDialogProps> = ({
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
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getElementLabel = (element: string): string => {
    const labels: Record<string, string> = {
      'base-background': 'Background',
      'playing-area': 'Playing Area',
      'lines': 'Court Lines',
      'three-point': 'Three Point Area',
      'center-circle': 'Center Circle',
      'three-second-area': 'Three Second Area',
      'tennis-playing-area': 'Playing Area',
      'tennis-lines': 'Court Lines',
      'pickleball-kitchen': 'Kitchen',
      'pickleball-service-area': 'Service Area',
      'pickleball-lines': 'Court Lines'
    };
    return labels[element] || element.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };  // Get all elements for a specific court type
  const getElementsForCourt = (court: CourtType): string[] => {
    switch (court) {
      case 'basketball':
        return ['base-background', 'playing-area', 'lines', 'three-point', 'center-circle', 'three-second-area'];
      case 'tennis':
        return ['base-background', 'tennis-playing-area', 'tennis-lines'];
      case 'pickleball':
        return ['base-background', 'pickleball-kitchen', 'pickleball-service-area', 'pickleball-lines'];
      default:
        return ['base-background'];
    }
  };

  // Get the color for a specific element, falling back to appliedColors if not in designSummary
  const getElementColor = (element: string): string => {
    // First try to get from designSummary for current court
    if (designSummary && designSummary[courtType] && designSummary[courtType].colors && designSummary[courtType].colors[element]) {
      return designSummary[courtType].colors[element];
    }
    
    // Fallback to appliedColors (legacy format)
    const legacyKey = `${courtType}-${element}`;
    if (appliedColors[legacyKey]) {
      return appliedColors[legacyKey];
    }
    
    // Default colors if not found
    const defaults: Record<string, string> = {
      'base-background': '#6c6d6f', // Gray
      'playing-area': '#233e6d', // Standard Blue
      'lines': '#ffffff', // White
      'three-point': '#1a3054', // Competition Blue
      'center-circle': '#1a3054', // Competition Blue
      'three-second-area': '#1a3054', // Competition Blue
      'tennis-playing-area': '#7b3522', // Classic Red
      'tennis-lines': '#ffffff', // White
      'pickleball-kitchen': '#233e6d', // Standard Blue
      'pickleball-service-area': '#445f43', // Competition Green
      'pickleball-lines': '#ffffff' // White
    };
    
    return defaults[element] || '#6c6d6f';
  };

  const generateQuoteRequest = () => {
    const courtName = courtType.charAt(0).toUpperCase() + courtType.slice(1);
    
    let request = `COURT DESIGN QUOTE REQUEST\n\n`;
    request += `Customer Contact Information:\n`;
    request += `Email: ${email}\n`;
    if (phone) {
      request += `Phone: ${phone}\n`;
    }
    request += `Preferred Contact Method: ${preferredContact === 'email' ? 'Email' : 'Phone'}\n\n`;
    
    request += `COURT SPECIFICATIONS\n\n`;
    request += `Primary Court: ${courtName}\n`;
    
    // Show ALL components for the current court type
    request += `\n${courtName} Court Components:\n`;
    
    // Get all elements for this court type and show their colors
    const courtElements = getElementsForCourt(courtType);
    courtElements.forEach(element => {
      const elementLabel = getElementLabel(element);
      const color = getElementColor(element);
      const colorName = getColorName(color);
      request += `  • ${elementLabel}: ${colorName}\n`;
    });
    
    // Add accessories information
    const showAccessoriesValue = designSummary && designSummary[courtType] 
      ? designSummary[courtType].showAccessories 
      : showAccessories;
    
    request += `  • Accessories (${courtType === 'basketball' ? 'Hoops' : 'Net'}): ${showAccessoriesValue ? 'Included' : 'Not Included'}\n`;
    
    // Add overlay information
    const enabledOverlays = Object.entries(designSummary?.overlays || overlays)
      .filter(([_, enabled]) => enabled)
      .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1));
    
    if (enabledOverlays.length > 0) {
      request += `\nCourt Overlays: ${enabledOverlays.join(', ')}\n`;
    } else {
      request += `\nCourt Overlays: None\n`;
    }

    request += `\nRequest Generated: ${new Date().toLocaleDateString()}\n`;
    request += `\nPlease provide a detailed quote for the above court design specifications.`;

    return request;
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
      const quoteRequest = generateQuoteRequest();
      const subject = `Quote Request - ${courtType.charAt(0).toUpperCase() + courtType.slice(1)} Court Design`;
      
      // Create mailto link
      const body = encodeURIComponent(quoteRequest);
      const mailto = `mailto:reagankola@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      
      // Open email client
      window.location.href = mailto;
      
      // Close dialog after a short delay
      setTimeout(() => {
        onClose();
        setEmail('');
        setPhone('');
        setPreferredContact('email');
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
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Contact Information</h3>
              <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="your.email@example.com"
              required
              error={emailError}
            />
            <Input
              label="Phone Number (Optional)"
              type="text"
              value={phone}
              onChange={setPhone}
              placeholder="(555) 123-4567"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Contact Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center">                  <input
                    type="radio"
                    name="contact"
                    value="email"
                    checked={preferredContact === 'email'}
                    onChange={() => setPreferredContact('email')}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contact"
                    value="phone"
                    checked={preferredContact === 'phone'}
                    onChange={() => setPreferredContact('phone')}
                    className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Phone</span>
                </label>
              </div>
            </div>
          </div>
        </div>        {/* Design Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Your Design Summary</h3>
          <div className="text-sm text-gray-600 space-y-2">            <p><strong>Primary Court:</strong> {courtType.charAt(0).toUpperCase() + courtType.slice(1)}</p>
            
            {/* Show ALL components for current court type */}
            <div className="mt-3">
              <p className="font-medium text-gray-700 mb-2">Court Components:</p>
              <ul className="ml-4 space-y-1">
                {getElementsForCourt(courtType).map((element) => {
                  const color = getElementColor(element);
                  return (
                    <li key={element} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded border border-gray-300 mr-2" 
                        style={{ backgroundColor: color }}
                      />
                      <span>{getElementLabel(element)}: {getColorName(color)}</span>
                    </li>
                  );
                })}
                <li>
                  Accessories ({courtType === 'basketball' ? 'Hoops' : 'Net'}): {
                    designSummary && designSummary[courtType] 
                      ? (designSummary[courtType].showAccessories ? 'Included' : 'Not Included')
                      : (showAccessories ? 'Included' : 'Not Included')
                  }
                </li>
              </ul>
            </div>
            
            <p><strong>Court Overlays:</strong> {
              Object.entries(overlays)
                .filter(([_, enabled]) => enabled)
                .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1))
                .join(', ') || 'None'
            }</p>
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
            {isSubmitting ? 'Sending Request...' : 'Request Quote'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
