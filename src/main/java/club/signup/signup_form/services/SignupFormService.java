package club.signup.signup_form.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import club.signup.signup_form.entities.ClubSignupForm;
import club.signup.signup_form.entities.FormSubmission;
import club.signup.signup_form.repositories.ClubSignupFormRepository;
import club.signup.signup_form.repositories.FormSubmissionRepository;

@Service
public class SignupFormService {
    
    @Autowired
    private ClubSignupFormRepository formRepository;
    
    @Autowired
    private FormSubmissionRepository submissionRepository;
    
    public Optional<ClubSignupForm> getFormById(String formId) {
        try {
            return formRepository.findByFormId(formId);
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }
    
    public FormSubmission submitForm(FormSubmission submission) {
        submission.setSubmissionDate(LocalDateTime.now());
        return submissionRepository.save(submission);
    }
    
    public boolean isRegistrationOpen(ClubSignupForm form) {
        return LocalDateTime.now().isAfter(form.getRegistrationOpens()) || 
               LocalDateTime.now().isEqual(form.getRegistrationOpens());
    }
}