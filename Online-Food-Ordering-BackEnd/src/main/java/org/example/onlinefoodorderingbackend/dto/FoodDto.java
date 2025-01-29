package org.example.onlinefoodorderingbackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import lombok.Getter;
import lombok.Setter;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class FoodDto {

    private Long id;
    private String name;
    @Column(columnDefinition = "text")
    private String description;
    private long price;
    private boolean available;
    @JsonProperty("isVegetarian")
    private boolean isVegetarian;
    @JsonProperty("isSeasonal")
    private boolean isSeasonal;
    @JsonProperty("isNonVegetarian") // add this for Json
    private boolean isNonVegetarian;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate;
    private String images;

    private Long foodCategoryId;
    private Long restaurantId;

    private List<String> ingredientsCategoryName;
    private List<String> ingredientsItemName;

    private List<IngredientCategoryAndItemName> ingredientCategoryAndItemName;
    private String foodCategoryName;
}
