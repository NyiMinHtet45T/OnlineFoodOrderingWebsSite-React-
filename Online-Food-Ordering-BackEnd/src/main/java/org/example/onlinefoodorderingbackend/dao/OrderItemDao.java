package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.dto.OrderItemDto;
import org.example.onlinefoodorderingbackend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {


    @Query("""
select oi from OrderItem oi where oi.order.user.id=:userId
""")
    Optional<List<OrderItem>> findOrderItemByUserId(Long userId);


    @Query("""
select oi from OrderItem oi where oi.food.restaurants.id = :restaurantId and (:orderStatus is null or oi.orderItemState = :orderStatus)
""")
    List<OrderItem> findOrderItemByRestaurantIdAndStatus(Long restaurantId, String orderStatus);
}
