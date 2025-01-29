package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.dto.OrderDto;
import org.example.onlinefoodorderingbackend.model.Order;
import org.example.onlinefoodorderingbackend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface OrderDao extends JpaRepository<Order, Long> {

//    @Query("""
//select o from Order o where o.restaurant.id = :restaurantId and o.orderStatus =:orderStatus
//""")
//    List<Order> findOrderByRestaurantIdAndState(Long restaurantId, String orderStatus);
}
