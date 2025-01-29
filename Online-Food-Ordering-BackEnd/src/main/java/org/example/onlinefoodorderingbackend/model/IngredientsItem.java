package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class IngredientsItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    private boolean inStoke;

    @ManyToOne()
    private Restaurant restaurant;

    @ManyToOne()
    private IngredientCategory ingredientCategory;

    public IngredientsItem(String name) {
        this.name = name;
    }
}
