'use client';

import { useState } from 'react';
import { ClubSignupForm, FormSubmission } from '@/lib/types';
import { submitForm } from '@/lib/api';

interface SignupWizardProps {
  formDetails: ClubSignupForm;
  formId: string;
}

export default function SignupWizard({ formDetails, formId }: SignupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormSubmission>({
    formId: formId,
    memberTypeId: '',
    name: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isRegistrationOpen = (): boolean => {
    const registrationDate = new Date(formDetails.registrationOpens);
    const currentDate = new Date();
    return currentDate >= registrationDate;
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.memberTypeId) {
      setErrors({ memberTypeId: 'Please select a membership type' });
      return;
    }

    if (currentStep === 2) {
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
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: keyof FormSubmission, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear error for this field if it exists
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await submitForm(formId, formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (!isRegistrationOpen()) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Registration Not Yet Open</h2>
          <p className="text-yellow-700">
            Registration for <strong>{formDetails.title}</strong> will open on{' '}
            {new Date(formDetails.registrationOpens).toLocaleDateString()}.
          </p>
          <p className="mt-2 text-yellow-700">Please check back then!</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-green-800 mb-2">Registration Successful!</h2>
          <p className="text-green-700">
            Thank you for signing up for <strong>{formDetails.title}</strong>.
          </p>
          <p className="mt-2 text-green-700">
            We have sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{formDetails.title}</h1>
      
      {/* Wizard Progress */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            1
          </div>
          <div className={`h-1 w-12 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            2
          </div>
          <div className={`h-1 w-12 mx-2 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
            currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            3
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      )}
      
      {/* Wizard Content */}
      <div className="bg-white border rounded-lg shadow-sm p-6">
        {/* Step 1: Membership Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Membership Selection</h2>
            <p className="text-gray-600 mb-6">
              Please select your preferred membership type for {formDetails.clubId}.
            </p>
            
            <div className="mb-6">
              <label className="block font-medium mb-2">
                Membership Type:
              </label>
              <div className="space-y-3">
                {formDetails.memberTypes.map((type) => (
                  <div key={type.id} className="flex items-center">
                    <input
                      type="radio"
                      id={type.id}
                      name="memberType"
                      className="mr-2"
                      value={type.id}
                      checked={formData.memberTypeId === type.id}
                      onChange={() => handleInputChange('memberTypeId', type.id)}
                    />
                    <label htmlFor={type.id} className="text-gray-800">
                      {type.name}
                    </label>
                  </div>
                ))}
                {errors.memberTypeId && (
                  <p className="text-red-600 text-sm mt-1">{errors.memberTypeId}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 2: Personal Information</h2>
            <p className="text-gray-600 mb-6">Please provide your contact details below.</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block font-medium mb-2">
                  Full Name:
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block font-medium mb-2">
                  Email Address:
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block font-medium mb-2">
                  Phone Number:
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block font-medium mb-2">
                  Birth Date:
                </label>
                <input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className={`w-full p-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {errors.birthDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Review Your Information</h2>
            <p className="text-gray-600 mb-6">Please review your information before submitting.</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg border-b border-gray-200 pb-2 mb-3">
                Membership Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-medium">Club:</p>
                  <p>{formDetails.clubId}</p>
                </div>
                <div>
                  <p className="font-medium">Membership Type:</p>
                  <p>
                    {formDetails.memberTypes.find(
                      (type) => type.id === formData.memberTypeId
                    )?.name || 'Unknown'}
                  </p>
                </div>
              </div>
              
              <h3 className="font-medium text-lg border-b border-gray-200 pb-2 mb-3">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Name:</p>
                  <p>{formData.name}</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p>{formData.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone:</p>
                  <p>{formData.phoneNumber}</p>
                </div>
                <div>
                  <p className="font-medium">Birth Date:</p>
                  <p>{new Date(formData.birthDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}