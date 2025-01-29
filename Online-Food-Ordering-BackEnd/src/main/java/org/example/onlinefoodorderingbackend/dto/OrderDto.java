package org.example.onlinefoodorderingbackend.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.onlinefoodorderingbackend.model.Address;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class OrderDto {

    private Long id;
    private Long userId;
    private Long addressId;
    private Long totalPrice;
    private int totalQuantity;
}
