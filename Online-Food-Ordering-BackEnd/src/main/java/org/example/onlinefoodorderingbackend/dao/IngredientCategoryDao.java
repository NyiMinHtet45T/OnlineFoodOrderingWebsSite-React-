package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IngredientCategoryDao extends JpaRepository<IngredientCategory, Long> {


    @Query("""
select i from IngredientCategory i where i.restaurant.id =:restaurantId
""")
    Optional<List<IngredientCategory>> findByRestaurantId(Long restaurantId);

    @Query("""
select it from IngredientsItem it where it.restaurant.id = :restaurantId and it.ingredientCategory.name in (:categoryName)
""")
    List<IngredientsItem> findIngredientItemByCategoryIdList(List<String> categoryName, Long restaurantId);

    @Query("""
select ic from IngredientCategory ic where ic.restaurant.id =:restaurantId and ic.name in (:ingredientsCategoryName)
""")
    List<IngredientCategory> findIngredientCategoryById(List<String> ingredientsCategoryName, Long restaurantId);
}


