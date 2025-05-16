package club.signup.signup_form.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
import club.signup.signup_form.entities.MemberType;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/forms")
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {
    
    @GetMapping("/{formId}")
    public ResponseEntity<ClubSignupForm> getFormDetails(@PathVariable String formId) {
        ClubSignupForm form = new ClubSignupForm();
        form.setFormId(UUID.randomUUID());
        form.setClubId("britsport");
        form.setTitle("Coding camp summer 2025");
        
        // Set registration date to December 16, 2024
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime registrationDate = LocalDateTime.parse("2024-12-16T00:00:00Z", formatter);
        form.setRegistrationOpens(registrationDate);
        
        List<MemberType> memberTypes = new ArrayList<>();
        
        MemberType activeMember = new MemberType();
        activeMember.setId(UUID.randomUUID());
        activeMember.setName("Active Member");
        memberTypes.add(activeMember);
        
        MemberType socialMember = new MemberType();
        socialMember.setId(UUID.randomUUID());
        socialMember.setName("Social Member");
        memberTypes.add(socialMember);
        
        form.setMemberTypes(memberTypes);
        
        return ResponseEntity.ok(form);
    }
    
    @PostMapping("/{formId}/submissions")
    public ResponseEntity<?> submitForm(@PathVariable String formId, 
                                      @Valid @RequestBody FormSubmission submission) {
        submission.setSubmissionDate(LocalDateTime.now());
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Submission successful");
    }
}