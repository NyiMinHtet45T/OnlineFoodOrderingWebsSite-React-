package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class OrderItemDto {

    private Long id;
    private int quantity;
    private double totalPrice;
    private List<String> ingredients;

    private String orderItemState;
    private String foodImage;
    private String foodName;
    private String customerName;

}
