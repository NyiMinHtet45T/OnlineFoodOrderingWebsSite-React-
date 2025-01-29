package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDto {
    private Long id;
    private String state;
    private String city;
    private String streetAddress;
    private String country;

    private String fullAddress;
}
