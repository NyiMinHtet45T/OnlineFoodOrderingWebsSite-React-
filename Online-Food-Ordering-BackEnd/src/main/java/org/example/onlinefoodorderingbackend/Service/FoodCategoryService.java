package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.FoodCategoryDao;
import org.example.onlinefoodorderingbackend.dao.RestaurantDao;
import org.example.onlinefoodorderingbackend.dto.FoodCategoryDto;
import org.example.onlinefoodorderingbackend.model.FoodCategory;
import org.example.onlinefoodorderingbackend.model.Restaurant;
import org.example.onlinefoodorderingbackend.utils.FoodCategoryUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodCategoryService {

    private final FoodCategoryDao foodCategoryDao;

    private final RestaurantDao restaurantDao;

    public void createFoodCategoryDto(FoodCategoryDto foodCategoryDto) {
        foodCategoryDao.save(initFoodCategory(foodCategoryDto));
    }

    public List<FoodCategoryDto> getFoodCategoryByRestaurantId(Long restaurantId) {
        return foodCategoryDao.findCategoryByRestaurantId(restaurantId).stream()
                .map(FoodCategoryUtils::foodCategoryToFoodCategoryDto)
                .toList();
    }

    public FoodCategoryDto getFoodCategoryById(Long foodCategoryId) {
        return FoodCategoryUtils.foodCategoryToFoodCategoryDto(foodCategoryDao.findById(foodCategoryId).orElseThrow(() -> new UsernameNotFoundException("FoodCategory Not Found")));
    }

    public void updateFoodCategoryById(FoodCategoryDto foodCategoryDto) {
        if(!foodCategoryDao.existsById(foodCategoryDto.getId())) {
            throw new UsernameNotFoundException("FoodCategory Not Found");
        }
        FoodCategory foodCategory = initFoodCategory(foodCategoryDto);
        foodCategory.setId(foodCategoryDto.getId());
        foodCategoryDao.save(foodCategory);
    }

    public void deleteFoodCategoryById(Long foodCategoryId) {
        if(!foodCategoryDao.existsById(foodCategoryId)) {
            throw new UsernameNotFoundException("FoodCategory Not Found");
        }
        foodCategoryDao.deleteById(foodCategoryId);

    }

    private FoodCategory initFoodCategory(FoodCategoryDto foodCategoryDto) { // making init method
        FoodCategory foodCategory = FoodCategoryUtils.foodCategoryDtoToFoodCategory(foodCategoryDto);
        Restaurant restaurant = restaurantDao.findById(foodCategoryDto.getRestaurantId()).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found"));
        foodCategory.setRestaurant(restaurant);
        return  foodCategory;
    }

}
