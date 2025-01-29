package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;
    private String city;
    private String streetAddress;
    private String country;

    public Address(String state, String city, String streetAddress, String country) {
        this.state = state;
        this.city = city;
        this.streetAddress = streetAddress;
        this.country = country;
    }
}
