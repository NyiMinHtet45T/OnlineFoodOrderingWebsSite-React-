package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FoodCategoryDao extends JpaRepository<FoodCategory, Long> {

    @Query("select f from FoodCategory f where f.restaurant.id = :restaurantId")
    List<FoodCategory> findCategoryByRestaurantId(Long restaurantId);
}
