package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.IngredientCategoryDto;
import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;

public class IngredientUtils {

    public static IngredientCategory ingredientCategoryDtoToIngredientCategory(IngredientCategoryDto ingredientCategoryDto) {
        return new IngredientCategory(ingredientCategoryDto.getName());
    }

    public static IngredientCategoryDto ingredientCategoryToIngredientCategoryDto(IngredientCategory ingredientCategory) {
        IngredientCategoryDto ingredientCategoryDto = new IngredientCategoryDto();
        ingredientCategoryDto.setId(ingredientCategory.getId());
        ingredientCategoryDto.setName(ingredientCategory.getName());
        ingredientCategoryDto.setRestaurantId(ingredientCategory.getRestaurant().getId());
        return ingredientCategoryDto;
    }

    public static IngredientsItem ingredientsItemDtoToIngredientsItem(IngredientsItemDto ingredientsItemDto) {
        IngredientsItem ingredientsItem = new IngredientsItem();
        ingredientsItem.setName(ingredientsItemDto.getName());
        ingredientsItem.setInStoke(ingredientsItemDto.isInStoke());
        return ingredientsItem;
    }

    public static IngredientsItemDto ingredientItemToIngredientItemDto(IngredientsItem ingredientsItem) {
        IngredientsItemDto ingredientsItemDto = new IngredientsItemDto();
        ingredientsItemDto.setId(ingredientsItem.getId());
        ingredientsItemDto.setName(ingredientsItem.getName());
        ingredientsItemDto.setInStoke(ingredientsItem.isInStoke());
        ingredientsItemDto.setRestaurantId(ingredientsItem.getRestaurant().getId());
        ingredientsItemDto.setIngredientCategoryId(ingredientsItem.getIngredientCategory().getId());
        ingredientsItemDto.setIngredientCategoryName(ingredientsItem.getIngredientCategory().getName());
        return ingredientsItemDto;
    }
}
