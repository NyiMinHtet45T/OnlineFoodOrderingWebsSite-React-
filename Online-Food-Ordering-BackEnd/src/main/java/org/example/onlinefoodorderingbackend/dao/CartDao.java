package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartDao extends JpaRepository<Cart, Long> {

    @Query("select c from Cart c where c.user.id = :userId")
    Optional<Cart> findCartByUserId(Long userId);
}
