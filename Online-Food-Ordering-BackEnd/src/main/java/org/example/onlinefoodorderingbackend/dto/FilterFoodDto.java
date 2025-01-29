package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;

@Getter
public class FilterFoodDto {
    private Long restaurantId;
    private Boolean isVegetarian;
    private Boolean isSeasonal;
    private Boolean isNonVegetarian;
    private Long foodCategoryId;
}
