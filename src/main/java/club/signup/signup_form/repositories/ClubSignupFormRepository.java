package club.signup.signup_form.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import club.signup.signup_form.entities.ClubSignupForm;

public interface ClubSignupFormRepository extends JpaRepository<ClubSignupForm, String> {
    Optional<ClubSignupForm> findByFormId(String formId);
}
