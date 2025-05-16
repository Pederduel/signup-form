export interface MemberType {
  id: string;
  name: string;
}

export interface ClubSignupForm {
  clubId: string;
  memberTypes: MemberType[];
  formId: string;
  title: string;
  registrationOpens: string;
}

export interface FormSubmission {
  formId: string;
  memberTypeId: string;
  name: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
}

export interface WizardState {
  currentStep: number;
  formData: FormSubmission;
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
}