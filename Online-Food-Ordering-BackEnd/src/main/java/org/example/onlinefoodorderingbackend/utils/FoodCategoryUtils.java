package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.FoodCategoryDto;
import org.example.onlinefoodorderingbackend.model.FoodCategory;
import org.springframework.stereotype.Component;


public class FoodCategoryUtils {

    public static FoodCategory foodCategoryDtoToFoodCategory(FoodCategoryDto foodCategoryDto) {
        return new FoodCategory(foodCategoryDto.getName());
    }

    public static FoodCategoryDto foodCategoryToFoodCategoryDto(FoodCategory foodCategory) {
        FoodCategoryDto foodCategoryDto = new FoodCategoryDto();
        foodCategoryDto.setId(foodCategory.getId());
        foodCategoryDto.setName(foodCategory.getName());
        foodCategoryDto.setRestaurantId(foodCategory.getRestaurant().getId());
        return foodCategoryDto;
    }
}
