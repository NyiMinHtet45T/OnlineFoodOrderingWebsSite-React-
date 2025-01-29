package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RestaurantListResponseDto {

    private Long id;
    private String name;
    private String description;
    private boolean open;

    private boolean isFavourite;
    private List<String> image;
}
