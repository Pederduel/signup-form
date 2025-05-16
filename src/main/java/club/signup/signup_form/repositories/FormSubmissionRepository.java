package club.signup.signup_form.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import club.signup.signup_form.entities.FormSubmission;

public interface FormSubmissionRepository extends JpaRepository<FormSubmission, UUID> {
}