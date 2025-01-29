package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodCategoryDto {

    private Long id;
    private String name;

    private Long restaurantId;
}
