package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartItemDto {

    private Long id;
    private int quantity;
    private long totalPrice;
    private List<String> ingredients;

    private Long foodId;

    private String foodName;
    private String image;
}
