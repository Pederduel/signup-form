package club.signup.signup_form.models;

import java.util.UUID;

public class SubmissionResponseModel {
    private String message;
    private UUID submissionId;
    
    public SubmissionResponseModel(String message, UUID submissionId) {
        this.message = message;
        this.submissionId = submissionId;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public UUID getSubmissionId() {
        return submissionId;
    }
    
    public void setSubmissionId(UUID submissionId) {
        this.submissionId = submissionId;
    }
}
