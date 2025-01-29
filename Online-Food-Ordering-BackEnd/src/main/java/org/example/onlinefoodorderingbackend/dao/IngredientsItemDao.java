package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IngredientsItemDao extends JpaRepository<IngredientsItem, Long> {

    @Query("""
select i from IngredientsItem i where i.restaurant.id = :restaurantId
""")
    Optional<List<IngredientsItem>> findByRestaurantId(Long restaurantId);

    @Query("""
select it from IngredientsItem it where it.restaurant.id = :restaurantId and it.name in (:ingredientsItemName)
""")
    List<IngredientsItem> findIngredientById(List<String> ingredientsItemName, Long restaurantId);

    Optional<IngredientsItem> findByName(String name);
}
