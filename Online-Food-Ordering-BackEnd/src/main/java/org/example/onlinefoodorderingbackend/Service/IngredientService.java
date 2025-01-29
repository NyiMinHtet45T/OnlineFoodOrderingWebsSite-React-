package org.example.onlinefoodorderingbackend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.FoodDao;
import org.example.onlinefoodorderingbackend.dao.IngredientCategoryDao;
import org.example.onlinefoodorderingbackend.dao.IngredientsItemDao;
import org.example.onlinefoodorderingbackend.dao.RestaurantDao;
import org.example.onlinefoodorderingbackend.dto.IngredientCategoryDto;
import org.example.onlinefoodorderingbackend.dto.IngredientCategoryList;
import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.example.onlinefoodorderingbackend.model.Food;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;
import org.example.onlinefoodorderingbackend.utils.IngredientUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientCategoryDao ingredientCategoryDao;
    private final RestaurantDao restaurantDao;
    private final FoodDao foodDao;
    private final IngredientsItemDao ingredientsItemDao;

    public void createIngredientCategory(IngredientCategoryDto ingredientCategoryDto) {
        ingredientCategoryDao.save(initIngredientCategory(ingredientCategoryDto));
    }

    public void updateIngredientCategory(IngredientCategoryDto ingredientCategoryDto) {
        if(!ingredientCategoryDao.existsById(ingredientCategoryDto.getId())) {
            throw new UsernameNotFoundException("Ingredient category not found");
        }
        IngredientCategory ingredientCategory = initIngredientCategory(ingredientCategoryDto);
        ingredientCategory.setId(ingredientCategoryDto.getId());
        ingredientCategoryDao.save(ingredientCategory);
    }

    @Transactional
    public void deleteIngredientItemById(Long ingredientId) {
        IngredientsItem ingredientsItem = ingredientsItemDao.findById(ingredientId).orElseThrow(() -> new EntityNotFoundException("IngredientItem not found"));
        List<Food> listFood = foodDao.findAll();
        for(Food food : listFood) {
            food.getIngredientsItems().remove(ingredientsItem);
            foodDao.save(food);
        }
        ingredientsItemDao.delete(ingredientsItem);
    }

    @Transactional
    public void deleteIngredientCategoryById(Long ingredientCategoryId) {
        IngredientCategory ingredientCategory = ingredientCategoryDao.findById(ingredientCategoryId)
                .orElseThrow(() -> new EntityNotFoundException("IngredientCategory not found"));

        List<IngredientsItem> ingredientsItems = ingredientCategory.getIngredientsItems();

        List<Food> foodList = foodDao.findFoodByCategoryId(ingredientCategoryId).orElse(Collections.emptyList());

        if(ingredientsItems != null) {
            foodList.forEach(food -> {
                food.getIngredientsItems().removeAll(ingredientsItems);
                food.getIngredientCategories().remove(ingredientCategory);
                foodDao.save(food);
            });
            ingredientsItems.forEach(ingre -> ingredientsItemDao.deleteById(ingre.getId()));
        }
        ingredientCategoryDao.deleteById(ingredientCategoryId);
    }


    public IngredientCategoryDto getIngredientCategoryById(Long ingredientCategoryId) {
        return IngredientUtils.ingredientCategoryToIngredientCategoryDto(ingredientCategoryDao.findById(ingredientCategoryId).orElseThrow(() -> new UsernameNotFoundException("Ingredient Category not found")));
    }

    public IngredientsItemDto getIngredientItemById(Long ingredientItemId) {
        return IngredientUtils.ingredientItemToIngredientItemDto(ingredientsItemDao.findById(ingredientItemId).orElseThrow(() -> new UsernameNotFoundException("Ingredient item not found")));
    }

    public List<IngredientCategoryDto> getIngredientCategoryByRestaurantId(Long restaurantId) {
        return ingredientCategoryDao.findByRestaurantId(restaurantId)
                .orElse(new ArrayList<>())
                .stream()
                .map(IngredientUtils::ingredientCategoryToIngredientCategoryDto)
                .toList();
    }

    public void createIngredientsItem(IngredientsItemDto ingredientsItemDto) {
         ingredientsItemDao.save(initIngredientItem(ingredientsItemDto, true));
    }

    public void updateIngredientsItem(IngredientsItemDto ingredientsItemDto) {
        if(!ingredientsItemDao.existsById(ingredientsItemDto.getId())) {
            throw new UsernameNotFoundException("Ingredient does not exist");
        }
        IngredientsItem ingredientsItem = initIngredientItem(ingredientsItemDto, false);
        ingredientsItem.setId(ingredientsItemDto.getId());
        ingredientsItemDao.save(ingredientsItem);
    }

    public List<IngredientsItemDto> getIngredientsItemsByCategoryId(IngredientCategoryList ingredientCategoryList) {
        return ingredientCategoryDao.findIngredientItemByCategoryIdList(ingredientCategoryList.getIngredientCategoryNameList(), ingredientCategoryList.getRestaurantId())
                .stream()
                .map(IngredientUtils::ingredientItemToIngredientItemDto)
                .toList();
    }

    public List<IngredientsItemDto> getIngredientsItemByRestaurantId(Long restaurantId) {
        return ingredientsItemDao.findByRestaurantId(restaurantId)
                .orElse(new ArrayList<>())
                .stream()
                .map(IngredientUtils::ingredientItemToIngredientItemDto)
                .toList();
    }

    public Boolean updateIngredientsStoke(Long ingredientItemId) {
        IngredientsItem ingredientsItem = ingredientsItemDao.findById(ingredientItemId).orElseThrow(() -> new UsernameNotFoundException("Ingredient item not found"));
        ingredientsItem.setInStoke(!ingredientsItem.isInStoke());
        return ingredientsItemDao.save(ingredientsItem).isInStoke();
    }

    private IngredientsItem initIngredientItem(IngredientsItemDto ingredientsItemDto, boolean isCreate) { // making init method for IngredientItem

        IngredientsItem existingItem = ingredientsItemDao.findByName(ingredientsItemDto.getName()).orElse(null);
        IngredientCategory ingredientCategory = ingredientCategoryDao.findById(ingredientsItemDto.getIngredientCategoryId()).orElseThrow(() -> new UsernameNotFoundException("Ingredient Category not found"));
        IngredientsItem ingredientsItem = IngredientUtils.ingredientsItemDtoToIngredientsItem(ingredientsItemDto);

        ingredientsItem.setIngredientCategory(ingredientCategory);
        ingredientsItem.setRestaurant(restaurantDao.findById(ingredientsItemDto.getRestaurantId()).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found")));
        if(isCreate) {
            ingredientCategory.addIngredientsItem(ingredientsItem);
        }
        return ingredientsItem;
    }

    private IngredientCategory initIngredientCategory(IngredientCategoryDto ingredientCategoryDto) { // making init method for IngredientCategory
        IngredientCategory ingredientCategory = IngredientUtils.ingredientCategoryDtoToIngredientCategory(ingredientCategoryDto);
        ingredientCategory.setRestaurant(restaurantDao.findById(ingredientCategoryDto.getRestaurantId()).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found")));
        return ingredientCategory;
    }
}
