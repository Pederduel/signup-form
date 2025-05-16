package club.signup.signup_form.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import club.signup.signup_form.entities.ClubSignupForm;
import club.signup.signup_form.entities.FormSubmission;
import club.signup.signup_form.models.SubmissionResponseModel;
import club.signup.signup_form.services.SignupFormService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/forms")
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @Autowired
    private SignupFormService signupFormService;
    
    @GetMapping("/{formId}")
    public ResponseEntity<ClubSignupForm> getFormDetails(@PathVariable String formId) {
        return signupFormService.getFormById(formId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{formId}/submissions")
    public ResponseEntity<?> submitForm(@PathVariable String formId, 
                                      @Valid @RequestBody FormSubmission submission) {
        // Check if form exists
        var formOptional = signupFormService.getFormById(formId);
        if (formOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Form not found");
        }
        
        // Check if registration is open
        var form = formOptional.get();
        if (!signupFormService.isRegistrationOpen(form)) {
            return ResponseEntity.badRequest().body("Registration is not yet open");
        }
        
        // Ensure the form ID matches
        submission.setFormId(formId);
        
        // Save the submission
        FormSubmission savedSubmission = signupFormService.submitForm(submission);
        
        // Create a response DTO with a success message and the submission ID
        var responseModel = new SubmissionResponseModel(
            "Registration submitted successfully", 
            savedSubmission.getId()
        );
        
        return ResponseEntity.status(HttpStatus.CREATED).body(responseModel);
    }
}