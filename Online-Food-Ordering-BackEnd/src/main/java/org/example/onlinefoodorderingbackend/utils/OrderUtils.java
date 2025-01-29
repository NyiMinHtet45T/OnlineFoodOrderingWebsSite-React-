package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.OrderDto;
import org.example.onlinefoodorderingbackend.model.Order;

import java.time.LocalDate;

public class OrderUtils {

    public static OrderDto orderToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setAddressId(order.getAddress().getId());
        return orderDto;
    }

    public static Order orderDtoToOrder(OrderDto orderDto) {
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setTotalItem(orderDto.getTotalQuantity());
        order.setCreatedAt(LocalDate.now());
        return order;
    }
}
