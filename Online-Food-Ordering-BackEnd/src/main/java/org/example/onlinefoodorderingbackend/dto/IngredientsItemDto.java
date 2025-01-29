package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientsItemDto {

    private Long id;
    private String name;
    private boolean inStoke;

    private Long restaurantId;
    private Long ingredientCategoryId;

    private String ingredientCategoryName;
}
