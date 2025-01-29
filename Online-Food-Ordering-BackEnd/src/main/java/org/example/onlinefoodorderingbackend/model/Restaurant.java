package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "text")
    private String description;

    private String cuisineType;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationDate;
    private boolean open;
    private String openingHours;

    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    @ElementCollection
    private List<String> images;

    @OneToMany(mappedBy = "restaurants", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Food> foods = new ArrayList<>();

    public void addFood(Food food) {
        foods.add(food);
    }

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private ContactInformation contactInformation;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Address address;

    public Restaurant(String name, String description, String cuisineType, LocalDateTime registrationDate, boolean open, String openingHours) {
        this.name = name;
        this.description = description;
        this.cuisineType = cuisineType;
        this.registrationDate = registrationDate;
        this.open = open;
        this.openingHours = openingHours;
    }
}
