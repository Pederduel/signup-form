'use client';

import { useEffect, useState } from 'react';
import SignupWizard from '@/components/SignupWizard';
import { ClubSignupForm } from '@/lib/types';
import { fetchFormDetails } from '@/lib/api';
import Link from 'next/link';

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
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full mb-4"></div>
          <p>Loading form details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-800">Error</h3>
          <p className="text-red-700 mt-1">{error}</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (!formDetails) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-medium text-red-800">Form Unavailable</h3>
          <p className="text-red-700 mt-1">Form details are not available at this time.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline inline-flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Spond Club Membership Signup
          </h1>
          <p className="mt-2 text-gray-600">Complete the form below to register for club membership</p>
        </div>
        
        <SignupWizard formDetails={formDetails} formId={FORM_ID} />
      </div>
    </div>
  );
}