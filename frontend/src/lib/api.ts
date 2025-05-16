import { ClubSignupForm, FormSubmission } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const fetchFormDetails = async (formId: string): Promise<ClubSignupForm> => {
  const response = await fetch(`${API_URL}/forms/${formId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch form details');
  }
  
  return response.json();
};

export const submitForm = async (formId: string, data: FormSubmission): Promise<void> => {
  const response = await fetch(`${API_URL}/forms/${formId}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Form submission failed');
  }
};