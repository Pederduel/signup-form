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
      <div className="bg-amber-50 text-amber-800 p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Registration Not Yet Open</h2>
        <p className="mb-2">
          Registration for {formDetails.title} will open on{' '}
          {new Date(formDetails.registrationOpens).toLocaleDateString()}.
        </p>
        <p>Please check back then!</p>
      </div>
    );
  }

  if (wizardState.isSuccess) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-lg shadow-md text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p className="mb-2">Thank you for signing up for {formDetails.title}.</p>
        <p>We have sent a confirmation email to {wizardState.formData.email}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">{formDetails.title}</h1>
      
      {/* Wizard Progress */}
      <div className="flex items-center justify-center mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
          ${wizardState.currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
          1
        </div>
        <div className={`h-1 w-12 mx-2 ${wizardState.currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
          ${wizardState.currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
          2
        </div>
        <div className={`h-1 w-12 mx-2 ${wizardState.currentStep >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
          ${wizardState.currentStep >= 3 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
          3
        </div>
      </div>
      
      {/* Error Message */}
      {wizardState.errorMessage && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {wizardState.errorMessage}
        </div>
      )}
      
      {/* Wizard Steps */}
      <div className="bg-white p-6 rounded-lg shadow-md">
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