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
      <h2 className="text-xl font-semibold mb-4">Step 2: Personal Information</h2>
      <p className="mb-6">Please provide your contact details below.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Full Name:
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email Address:
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone Number:
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onInputChange('phoneNumber', e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.phoneNumber && <div className="text-red-600 text-sm mt-1">{errors.phoneNumber}</div>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="birthDate" className="block font-medium mb-2">
            Birth Date:
          </label>
          <input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => onInputChange('birthDate', e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.birthDate && <div className="text-red-600 text-sm mt-1">{errors.birthDate}</div>}
        </div>
        
        <div className="flex justify-between">
          <button 
            type="button" 
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button 
            type="submit" 
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};