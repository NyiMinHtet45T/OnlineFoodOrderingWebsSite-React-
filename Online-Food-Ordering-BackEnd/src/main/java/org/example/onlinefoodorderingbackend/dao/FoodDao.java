package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.Food;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FoodDao extends JpaRepository<Food, Long> {

    @Query("""
select f from Food f where Lower(f.name) like lower(concat('%', :query, '%')) or Lower(f.foodCategory.name) like lower(concat('%', :query , '%'))
""")
    Optional<List<Food>> searchFoodByQuery(String query);

    @Query("""
select f from Food f where f.restaurants.id = :restaurantId
and (:isVegetarian is null or f.isVegetarian = :isVegetarian) and (:isSeasonal is null or f.isSeasonal = :isSeasonal)
and (:isNonVegetarian is null or f.isNonVegetarian = :isNonVegetarian) and (:foodCategoryId is null or f.foodCategory.id = :foodCategoryId)
""")
    Optional<List<Food>> findFoodByRestaurantIdAndCondition(Long restaurantId, Boolean isVegetarian, Boolean isSeasonal, Boolean isNonVegetarian, Long foodCategoryId);


    @Query("""
select f from Food f where f.restaurants.id = :restaurantId
""")
    List<Food> findByRestaurantId(Long restaurantId);

    @Query("""
select f from Food f join f.ingredientCategories ic where ic.id = :ingredientCategoryId
""")
    Optional<List<Food>> findFoodByCategoryId(Long ingredientCategoryId);
}
