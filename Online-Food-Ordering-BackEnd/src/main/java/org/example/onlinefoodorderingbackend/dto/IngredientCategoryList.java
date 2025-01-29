package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IngredientCategoryList {
    private List<String> ingredientCategoryNameList;
    private Long restaurantId;
}
