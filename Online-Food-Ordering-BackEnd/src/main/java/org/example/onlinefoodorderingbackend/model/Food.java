package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Food {

    @ManyToMany()
    @JoinTable(name = "food_ingredientCategory", joinColumns = @JoinColumn(name = "food_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ingredientCategory_id", referencedColumnName = "id"))
    private List<IngredientCategory> ingredientCategories = new ArrayList<>();

    @ManyToMany()
    @JoinTable(name = "food_ingredientItems", joinColumns = @JoinColumn(name = "food_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "ingredientItem_id", referencedColumnName = "id"))
    private List<IngredientsItem> ingredientsItems = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    private String description;
    private long price;
    @Column(nullable = false)
    private boolean available;
    @Column(nullable = false)
    private boolean isVegetarian;
    @Column(nullable = false)
    private boolean isSeasonal;
    @Column(nullable = false)
    private boolean isNonVegetarian;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
    @Column(nullable = false)
    private String image1;

    @ManyToOne
    private FoodCategory foodCategory;



    @ManyToOne
    private Restaurant restaurants;

    public Food(String name, String description, long price, boolean available, boolean isVegetarian, boolean isSeasonal, boolean isNonVegetarian, LocalDate creationDate) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
        this.isVegetarian = isVegetarian;
        this.isSeasonal = isSeasonal;
        this.isNonVegetarian = isNonVegetarian;
        this.creationDate = creationDate;
    }
}
