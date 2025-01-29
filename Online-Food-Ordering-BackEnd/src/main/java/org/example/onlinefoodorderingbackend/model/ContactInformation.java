package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class ContactInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String mobile;
    private String twitter;
    private String instagram;

    public ContactInformation(String email, String mobile, String twitter, String instagram) {
        this.email = email;
        this.mobile = mobile;
        this.twitter = twitter;
        this.instagram = instagram;
    }
}
