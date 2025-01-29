package org.example.onlinefoodorderingbackend.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import org.example.onlinefoodorderingbackend.model.Address;
import org.example.onlinefoodorderingbackend.model.ContactInformation;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class RestaurantDto {

    private Long id;
    private String name;
    private String description;
    private String cuisineType;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationDate;
    private boolean open;
    private String openingHours;
    private List<String> image;

    private Long ownerId;
    private ContactInformation contactInformation;
    private Address address;

    private String ownerName;
}
