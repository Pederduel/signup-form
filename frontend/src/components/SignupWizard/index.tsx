'use client';

import { useState } from 'react';
import { ClubSignupForm, FormSubmission, WizardState } from '@/lib/types';
import { submitForm } from '@/lib/api';
import { Step1MemberSelection } from './Step1MemberSelection';
import { Step2UserInfo } from './Step2UserInfo';
import { Step3Preview } from './Step3Preview';

interface SignupWizardProps {
  formDetails: ClubSignupForm;
  formId: string;
}

export const SignupWizard = ({ formDetails, formId }: SignupWizardProps) => {
  const [wizardState, setWizardState] = useState<WizardState>({
    currentStep: 1,
    formData: {
      formId: formId,
      memberTypeId: '',
      name: '',
      email: '',
      phoneNumber: '',
      birthDate: '',
    },
    isSubmitting: false,
    isSuccess: false,
    errorMessage: null,
  });

  const isRegistrationOpen = (): boolean => {
    const registrationDate = new Date(formDetails.registrationOpens);
    const currentDate = new Date();
    
    return currentDate >= registrationDate;
  };

  const handleNext = () => {
    setWizardState(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const handlePrevious = () => {
    setWizardState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleInputChange = (field: keyof FormSubmission, value: string) => {
    setWizardState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setWizardState(prev => ({ ...prev, isSubmitting: true, errorMessage: null }));
      await submitForm(formId, wizardState.formData);
      setWizardState(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
    } catch (err) {
      setWizardState(prev => ({
        ...prev,
        isSubmitting: false,
        errorMessage: err instanceof Error ? err.message : 'An unknown error occurred',
      }));
    }
  };

  if (!isRegistrationOpen()) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 bg-white border border-amber-200 rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-amber-800">Registration Not Yet Open</h3>
              <div className="mt-2 text-amber-700 text-sm">
                <p>Registration for <strong>{formDetails.title}</strong> will open on {new Date(formDetails.registrationOpens).toLocaleDateString()}.</p>
                <p className="mt-2">Please check back then!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (wizardState.isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-6 bg-white border border-green-200 rounded-lg shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-green-800">Registration Successful!</h3>
              <div className="mt-2 text-green-700 text-sm">
                <p>Thank you for signing up for <strong>{formDetails.title}</strong>.</p>
                <p className="mt-2">We have sent a confirmation email to {wizardState.formData.email}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{formDetails.title}</h1>
      
      {/* Wizard Progress */}
      <div className="flex items-center justify-center mb-8">
        <ol className="flex items-center w-full">
          <li className="flex items-center text-sm font-medium me-6 whitespace-nowrap">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${wizardState.currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} me-3`}>
              1
            </span>
            Membership
            <svg className="w-5 h-5 text-gray-400 ms-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </li>
          <li className="flex items-center text-sm font-medium me-6 whitespace-nowrap">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${wizardState.currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} me-3`}>
              2
            </span>
            Personal Info
            <svg className="w-5 h-5 text-gray-400 ms-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </li>
          <li className="flex items-center text-sm font-medium whitespace-nowrap">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${wizardState.currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} me-3`}>
              3
            </span>
            Review & Submit
          </li>
        </ol>
      </div>
      
      {/* Error Message */}
      {wizardState.errorMessage && (
        <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error with your submission</h3>
              <p className="text-sm text-red-700 mt-1">{wizardState.errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Wizard Steps */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {wizardState.currentStep === 1 && (
          <Step1MemberSelection
            memberTypes={formDetails.memberTypes}
            selectedMemberTypeId={wizardState.formData.memberTypeId}
            clubId={formDetails.clubId}
            onMemberTypeChange={(id) => handleInputChange('memberTypeId', id)}
            onNext={handleNext}
          />
        )}
        
        {wizardState.currentStep === 2 && (
          <Step2UserInfo
            formData={wizardState.formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}
        
        {wizardState.currentStep === 3 && (
          <Step3Preview
            formData={wizardState.formData}
            formDetails={formDetails}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            isSubmitting={wizardState.isSubmitting}
          />
        )}
      </div>
    </div>
  );
};