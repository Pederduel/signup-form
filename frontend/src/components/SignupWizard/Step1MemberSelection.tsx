import { MemberType } from '@/lib/types';

interface Step1Props {
  memberTypes: MemberType[];
  selectedMemberTypeId: string;
  clubId: string;
  onMemberTypeChange: (id: string) => void;
  onNext: () => void;
}

export const Step1MemberSelection = ({
  memberTypes,
  selectedMemberTypeId,
  clubId,
  onMemberTypeChange,
  onNext,
}: Step1Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Step 1: Membership Selection</h2>
      <p className="mb-6">Please select your preferred membership type for {clubId}.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="memberType" className="block font-medium mb-2">
            Membership Type:
          </label>
          <select
            id="memberType"
            value={selectedMemberTypeId}
            onChange={(e) => onMemberTypeChange(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a membership type</option>
            {memberTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-green-500 text-white px-6 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!selectedMemberTypeId}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};