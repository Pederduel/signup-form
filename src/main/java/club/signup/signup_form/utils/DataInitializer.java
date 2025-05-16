package club.signup.signup_form.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import club.signup.signup_form.entities.ClubSignupForm;
import club.signup.signup_form.entities.MemberType;
import club.signup.signup_form.repositories.ClubSignupFormRepository;



@Component
public class DataInitializer implements CommandLineRunner {
    // Initialize data here
    private final LocalDateTime registrationDate = LocalDateTime.parse("2025-05-16T00:00:00Z", DateTimeFormatter.ISO_DATE_TIME);
    
    @Autowired
    private ClubSignupFormRepository formRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (formRepository.count() == 0) {
            initializeTestForm();
        }
    }
    
    private void initializeTestForm() {
        ClubSignupForm form = new ClubSignupForm();
        form.setFormId("B171388180BC457D9887AD92B6CCFC86");
        form.setClubId("britsport");
        form.setTitle("Coding camp summer 2025");
        form.setRegistrationOpens(registrationDate);
        
        List<MemberType> memberTypes = new ArrayList<>();
        
        MemberType activeMember = new MemberType();
        activeMember.setId("8FE4113D4E4020E0DCF887803A886981");
        activeMember.setName("Active Member");
        memberTypes.add(activeMember);
        
        MemberType socialMember = new MemberType();
        socialMember.setId("4237C55C5CC3B4B082CBF2540612778E");
        socialMember.setName("Social Member");
        memberTypes.add(socialMember);
        
        form.setMemberTypes(memberTypes);
        
        formRepository.save(form);
    }
}