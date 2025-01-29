package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.*;
import org.example.onlinefoodorderingbackend.dto.*;
import org.example.onlinefoodorderingbackend.model.*;
import org.example.onlinefoodorderingbackend.utils.FoodUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodDao foodDao;
    private final FoodCategoryDao foodCategoryDao;
    private final RestaurantDao restaurantDao;
    private final IngredientCategoryDao ingredientCategoryDao;
    private final IngredientsItemDao ingredientsItemDao;

    public FoodDto createFood(FoodDto foodDto) {
        return FoodUtils.foodToFoodDtoWithWired(foodDao.save(initFood(foodDto, true)));
    }

    public void deleteFood(Long foodId) {
        if(foodDao.existsById(foodId)) {
            foodDao.deleteById(foodId);
        }
        throw new UsernameNotFoundException("Food not found");
    }

    public FoodDto getFoodById(Long foodId) {
        return FoodUtils.foodToFoodDtoWithNormal(foodDao.findById(foodId).orElseThrow(() -> new UsernameNotFoundException("Food not found")));
    }

    public FoodDto updateFood(FoodDto foodDto) {
        if(foodDao.existsById(foodDto.getId())) {
            Food food = initFood(foodDto, false);
            food.setId(foodDto.getId());
            return FoodUtils.foodToFoodDtoWithWired(foodDao.save(food));
        }
        throw new UsernameNotFoundException("Food not found");
    }

    public List<FoodDto> getRestaurantFood(FilterFoodDto filterFoodDto) {
         return foodDao.findFoodByRestaurantIdAndCondition(filterFoodDto.getRestaurantId(), filterFoodDto.getIsVegetarian(),
                         filterFoodDto.getIsSeasonal(), filterFoodDto.getIsNonVegetarian(),
                         filterFoodDto.getFoodCategoryId())
                 .orElse(new ArrayList<>())
                .stream()
                .map(FoodUtils::foodToFoodDtoWithWired)
                .toList();
    }

    public List<SearchFoodDto> searchFood(String query) {

         return foodDao.searchFoodByQuery(query)
                 .orElse(new ArrayList<>())
                 .stream()
                 .map(FoodUtils::foodToSearchFoodDto)
                 .toList();
    }

    public List<FoodDto> getFoodByRestaurantId(Long restaurantId) {
        return foodDao.findByRestaurantId(restaurantId)
                .stream()
                .map(FoodUtils::foodToFoodDtoWithWired)
                .toList();
    }

    public Boolean updateFoodAvailability(Long foodId) {
        Food food = foodDao.findById(foodId).orElseThrow(() -> new UsernameNotFoundException("Food not found"));
        food.setAvailable(!food.isAvailable());
        return foodDao.save(food).isAvailable();
    }

    private Food initFood(FoodDto foodDto, boolean create) {

        Food food = FoodUtils.foodDtoToFood(foodDto);
        FoodCategory foodCategory = foodCategoryDao.findById(foodDto.getFoodCategoryId()).orElseThrow(() -> new UsernameNotFoundException("FoodCategory not found"));
        food.setFoodCategory(foodCategory);
        Restaurant restaurant = restaurantDao.findById(foodDto.getRestaurantId()).orElseThrow(() -> new UsernameNotFoundException("Restaurants not found"));
        if(create) {
            foodCategory.addFood(food);
            restaurant.addFood(food);
        }
        food.setRestaurants(restaurant);
        List<IngredientCategory> ingredientCategoryList = ingredientCategoryDao.findIngredientCategoryById(foodDto.getIngredientsCategoryName(), foodDto.getRestaurantId());
        food.setIngredientCategories(ingredientCategoryList);
        List<IngredientsItem> ingredientsItemList = ingredientsItemDao.findIngredientById(foodDto.getIngredientsItemName(), foodDto.getRestaurantId());
        food.setIngredientsItems(ingredientsItemList);
        return food;
    }

}
