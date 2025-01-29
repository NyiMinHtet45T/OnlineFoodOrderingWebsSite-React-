package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartTotalPriceAndItemDto {

    private long cartTotalPrice;
    private int cartTotalItems;

}
