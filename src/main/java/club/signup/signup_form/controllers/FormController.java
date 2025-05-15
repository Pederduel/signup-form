package club.signup.signup_form.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class FormController {
    
    @GetMapping("/{formId}")
    public ResponseEntity<ClubSignupForm> getFormDetails(@PathVariable String formId) {
        ClubSignupForm form = new ClubSignupForm();
        List<MemberType> memberTypes = new ArrayList<>();
        form.setMemberTypes(memberTypes);
        return ResponseEntity.ok(form);
    }
    
    @PostMapping("/{formId}/submissions")
    public ResponseEntity<?> submitForm(@PathVariable String formId, 
                                       @Valid @RequestBody FormSubmission submission) {
        return ResponseEntity.status(HttpStatus.CREATED).body("test");
    }
}
