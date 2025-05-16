import { ClubSignupForm, FormSubmission } from '@/lib/types';

interface Step3Props {
  formData: FormSubmission;
  formDetails: ClubSignupForm;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

export const Step3Preview = ({
  formData,
  formDetails,
  onSubmit,
  onPrevious,
  isSubmitting,
}: Step3Props) => {
  const selectedMemberType = formDetails.memberTypes.find(
    (type) => type.id === formData.memberTypeId
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-3">Review Your Information</h2>
      <p className="text-gray-600 mb-6">Please review your information before submitting.</p>
      
      <div className="mb-8">
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 border-b py-3 px-4 md:px-5">
            <h3 className="font-semibold text-gray-800">Membership Information</h3>
          </div>
          
          <div className="p-4 md:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Club</h4>
                <p className="mt-1 text-gray-800">{formDetails.clubId}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Membership Type</h4>
                <p className="mt-1 text-gray-800">{selectedMemberType?.name || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-100 border-b py-3 px-4 md:px-5">
            <h3 className="font-semibold text-gray-800">Personal Information</h3>
          </div>
          
          <div className="p-4 md:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Full Name</h4>
                <p className="mt-1 text-gray-800">{formData.name}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Email Address</h4>
                <p className="mt-1 text-gray-800">{formData.email}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Phone Number</h4>
                <p className="mt-1 text-gray-800">{formData.phoneNumber}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase text-gray-500">Birth Date</h4>
                <p className="mt-1 text-gray-800">{new Date(formData.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
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
          type="button" 
          className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
              Submitting...
            </>
          ) : (
            <>
              Submit Registration
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};