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
      <h2 className="text-xl font-semibold mb-4">Step 3: Review Your Information</h2>
      <p className="mb-6">Please review your information before submitting.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="mb-6">
          <h3 className="font-medium text-lg border-b border-gray-200 pb-2 mb-3">
            Membership Details
          </h3>
          <p className="mb-2">
            <span className="font-medium">Club:</span> {formDetails.clubId}
          </p>
          <p>
            <span className="font-medium">Membership Type:</span> {selectedMemberType?.name || 'Unknown'}
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg border-b border-gray-200 pb-2 mb-3">
            Personal Information
          </h3>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {formData.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {formData.email}
          </p>
          <p className="mb-2">
            <span className="font-medium">Phone:</span> {formData.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Birth Date:</span> {new Date(formData.birthDate).toLocaleDateString()}
          </p>
        </div>
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
          type="button" 
          className="bg-green-500 text-white px-6 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Registration'}
        </button>
      </div>
    </div>
  );
};