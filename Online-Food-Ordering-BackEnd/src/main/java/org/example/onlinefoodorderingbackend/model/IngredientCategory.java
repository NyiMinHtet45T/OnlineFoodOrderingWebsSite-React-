package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class IngredientCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Restaurant restaurant;

    @OneToMany(mappedBy = "ingredientCategory", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<IngredientsItem> ingredientsItems = new ArrayList<>();

    public void addIngredientsItem(IngredientsItem ingredientsItem) {
        ingredientsItem.setIngredientCategory(this);
        ingredientsItems.add(ingredientsItem);
    }

    public IngredientCategory(String name) {
        this.name = name;
    }
}
