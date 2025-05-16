'use client';

import { useEffect, useState } from 'react';
import { SignupWizard } from '@/components/SignupWizard';
import { ClubSignupForm } from '@/lib/types';
import { fetchFormDetails } from '@/lib/api';

const FORM_ID = 'B171388180BC457D9887AD92B6CCFC86';

export default function SignupPage() {
  const [formDetails, setFormDetails] = useState<ClubSignupForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchFormDetails(FORM_ID);
        setFormDetails(data);
      } catch (err) {
        setError('Failed to load form details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFormDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-blue-50 text-blue-700 p-8 rounded-lg shadow-md">
          Loading form details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-700 p-8 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  if (!formDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-700 p-8 rounded-lg shadow-md">
          Form details not available
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Spond Club Membership Signup
      </h1>
      <SignupWizard formDetails={formDetails} formId={FORM_ID} />
    </div>
  );
}