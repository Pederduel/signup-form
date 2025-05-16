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
      <h2 className="text-xl font-bold text-gray-800 mb-3">Membership Selection</h2>
      <p className="text-gray-600 mb-6">
        Please select your preferred membership type for <span className="font-medium">{clubId}</span>.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="memberType" className="block text-sm font-medium mb-2 text-gray-700">
            Membership Type
          </label>
          <div className="space-y-4">
            {memberTypes.map((type) => (
              <div key={type.id} className="flex">
                <input
                  type="radio"
                  id={type.id}
                  name="memberType"
                  className="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-600"
                  value={type.id}
                  checked={selectedMemberTypeId === type.id}
                  onChange={() => onMemberTypeChange(type.id)}
                  required
                />
                <label htmlFor={type.id} className="text-sm text-gray-800 ms-2">
                  {type.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            type="submit" 
            className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            disabled={!selectedMemberTypeId}
          >
            Continue
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};