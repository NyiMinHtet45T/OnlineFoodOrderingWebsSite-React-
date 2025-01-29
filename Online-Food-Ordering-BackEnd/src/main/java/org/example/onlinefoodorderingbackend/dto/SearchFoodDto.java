package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SearchFoodDto {

    private Long id;
    private String name;
    private Long price;
    private String image;

    private Long restaurantId;
    private String restaurantName;
}
