import React from 'react';
import { Input } from '../ui';

export type ContactMethod = 'email' | 'phone';

interface ContactInformationFormProps {
  email: string;
  phone: string;
  preferredContact: ContactMethod;
  emailError?: string;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onPreferredContactChange: (method: ContactMethod) => void;
  className?: string;
}

const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  email,
  phone,
  preferredContact,
  emailError,
  onEmailChange,
  onPhoneChange,
  onPreferredContactChange,
  className = ""
}) => {
  return (
    <section className={`space-y-4 ${className}`}>
      <h3 className="font-medium text-gray-800">Contact Information</h3>
      
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="your.email@example.com"
        required
        error={emailError}
      />
      
      <Input
        label="Phone Number (Optional)"
        type="text"
        value={phone}
        onChange={onPhoneChange}
        placeholder="(555) 123-4567"
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferred Contact Method
        </label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="contact"
              value="email"
              checked={preferredContact === 'email'}
              onChange={() => onPreferredContactChange('email')}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-700">Email</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="contact"
              value="phone"
              checked={preferredContact === 'phone'}
              onChange={() => onPreferredContactChange('phone')}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="ml-2 text-gray-700">Phone</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default ContactInformationForm;
