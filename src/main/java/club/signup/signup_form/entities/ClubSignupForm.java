package club.signup.signup_form.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "club_signup_form")
public class ClubSignupForm {
    @Id
    @Column(name = "form_id")
    private String formId;
    
    private String clubId;
    private String title;
    private LocalDateTime registrationOpens;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
        name = "form_member_types",
        joinColumns = @JoinColumn(name = "form_id"),
        inverseJoinColumns = @JoinColumn(name = "member_type_id")
    )
    final private List<MemberType> memberTypes = new ArrayList<>();

    public String getFormId() {
        return formId;
    }

    public void setFormId(String formId) {
        this.formId = formId;
    }

    public String getClubId() {
        return clubId;
    }

    public void setClubId(String clubId) {
        this.clubId = clubId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getRegistrationOpens() {
        return registrationOpens;
    }

    public void setRegistrationOpens(LocalDateTime registrationOpens) {
        this.registrationOpens = registrationOpens;
    }

    public List<MemberType> getMemberTypes() {
        return memberTypes;
    }

    public void setMemberTypes(List<MemberType> memberTypes) {
        this.memberTypes.clear();
        if (memberTypes != null) {
            this.memberTypes.addAll(memberTypes);
        }
    }
}