package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemDao extends JpaRepository<CartItem, Long> {
}
