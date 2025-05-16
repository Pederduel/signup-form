import { useState } from 'react';
import { FormSubmission } from '@/lib/types';

interface Step2Props {
  formData: FormSubmission;
  onInputChange: (field: keyof FormSubmission, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step2UserInfo = ({
  formData,
  onInputChange,
  onNext,
  onPrevious,
}: Step2Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{8}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Phone number must be 8 digits';
    }
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate >= today) {
        newErrors.birthDate = 'Birth date must be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-3">Personal Information</h2>
      <p className="text-gray-600 mb-6">Please provide your contact details below.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:gap-6 mb-6">
          {/* Name input */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className={`py-2 px-3 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
              required
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className={`py-2 px-3 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
              required
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
          
          {/* Phone input */}
          <div>
            <label htmlFor="phone" className="block text-sm text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => onInputChange('phoneNumber', e.target.value)}
              className={`py-2 px-3 block w-full border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
              required
            />
            {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
          </div>
          
          {/* Birth date input */}
          <div>
            <label htmlFor="birthDate" className="block text-sm text-gray-700 font-medium mb-2">
              Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => onInputChange('birthDate', e.target.value)}
              className={`py-2 px-3 block w-full border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500`}
              required
            />
            {errors.birthDate && <p className="text-xs text-red-600 mt-1">{errors.birthDate}</p>}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button 
            type="button" 
            className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
            onClick={onPrevious}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back
          </button>
          <button 
            type="submit" 
            className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
          >
            Continue
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};