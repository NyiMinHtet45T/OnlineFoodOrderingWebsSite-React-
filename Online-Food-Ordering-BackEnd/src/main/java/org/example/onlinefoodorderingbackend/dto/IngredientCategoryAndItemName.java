package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IngredientCategoryAndItemName {
    private String categoryName;
    private List<IngredientsItemDto> ingredientsItemDtoList;
}
