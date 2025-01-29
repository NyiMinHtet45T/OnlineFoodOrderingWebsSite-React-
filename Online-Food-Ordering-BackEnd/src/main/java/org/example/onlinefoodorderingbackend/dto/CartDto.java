package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.onlinefoodorderingbackend.model.CartItem;
import org.example.onlinefoodorderingbackend.model.User;

import java.util.List;

@Getter
@Setter
public class CartDto {

    private Long id;
    private long total;

    private List<CartItemDto> cartItemDto;
    private Long userId;
    private String foodName;
}
