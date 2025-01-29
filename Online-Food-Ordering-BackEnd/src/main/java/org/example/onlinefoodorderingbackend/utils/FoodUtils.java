package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.FoodDto;
import org.example.onlinefoodorderingbackend.dto.IngredientCategoryAndItemName;
import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.example.onlinefoodorderingbackend.dto.SearchFoodDto;
import org.example.onlinefoodorderingbackend.model.Food;
import org.example.onlinefoodorderingbackend.model.IngredientCategory;
import org.example.onlinefoodorderingbackend.model.IngredientsItem;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class FoodUtils {

    public static Food foodDtoToFood(FoodDto foodDto) {
        Food food = new Food();
        food.setName(foodDto.getName());
        food.setDescription(foodDto.getDescription());
        food.setPrice(foodDto.getPrice());
        food.setAvailable(foodDto.isAvailable());
        food.setVegetarian(foodDto.isVegetarian());
        food.setNonVegetarian(foodDto.isNonVegetarian());
        food.setSeasonal(foodDto.isSeasonal());
        food.setCreationDate(LocalDate.now());
        food.setImage1(foodDto.getImages());
        return food;
    }

    public static FoodDto foodToFoodDto(Food food) {
        FoodDto foodDto = new FoodDto();
        foodDto.setId(food.getId());
        foodDto.setName(food.getName());
        foodDto.setDescription(food.getDescription());
        foodDto.setPrice(food.getPrice());
        foodDto.setAvailable(food.isAvailable());
        foodDto.setVegetarian(food.isVegetarian());
        foodDto.setSeasonal(food.isSeasonal());
        foodDto.setNonVegetarian(food.isNonVegetarian());
        foodDto.setCreationDate(food.getCreationDate());
        foodDto.setImages(food.getImage1());
        foodDto.setFoodCategoryId(food.getFoodCategory().getId());
        foodDto.setRestaurantId(food.getRestaurants().getId());
        foodDto.setFoodCategoryName(food.getFoodCategory().getName());
        return foodDto;
    }

    public static FoodDto foodToFoodDtoWithWired(Food food) {
        FoodDto foodDto = foodToFoodDto(food);
        foodDto.setIngredientCategoryAndItemName(wireIngredientCategoryAndItemName(food));
        return foodDto;
    }

    public static List<IngredientCategoryAndItemName> wireIngredientCategoryAndItemName(Food food) { // making wire IngredientCategory andIngredientItem

        List<IngredientCategory> ingredientCategoryList = food.getIngredientCategories();
        List<IngredientsItem> ingredientsItems = food.getIngredientsItems();

        List<IngredientCategoryAndItemName> ingredientCategoryAndItemNameList = new ArrayList<>();

        for(IngredientCategory ingredientCategory : ingredientCategoryList) {
            IngredientCategoryAndItemName ingredientCategoryAndItemName = getIngredientCategoryAndItemName(ingredientCategory, ingredientsItems);
            ingredientCategoryAndItemNameList.add(ingredientCategoryAndItemName);
        }
        return ingredientCategoryAndItemNameList;
    }

    private static IngredientCategoryAndItemName getIngredientCategoryAndItemName(IngredientCategory ingredientCategory, List<IngredientsItem> ingredientsItems) {
        IngredientCategoryAndItemName ingredientCategoryAndItemName = new IngredientCategoryAndItemName();
        ingredientCategoryAndItemName.setCategoryName(ingredientCategory.getName());
        List<IngredientsItemDto> ingredientsItemDtos = new ArrayList<>();
        for(IngredientsItem ingredientsItem : ingredientsItems) {
            if(ingredientCategory.getIngredientsItems().contains(ingredientsItem)) {
                IngredientsItemDto ingredientsItemDto = new IngredientsItemDto();
                ingredientsItemDto.setName(ingredientsItem.getName());
                ingredientsItemDto.setInStoke(ingredientsItem.isInStoke());

                ingredientsItemDtos.add(ingredientsItemDto);
            }

        }
        ingredientCategoryAndItemName.setIngredientsItemDtoList(ingredientsItemDtos);
        return ingredientCategoryAndItemName;
    }

    public static FoodDto foodToFoodDtoWithNormal(Food food) {
        FoodDto foodDto = foodToFoodDto(food);
        foodDto.setIngredientsCategoryName(food.getIngredientCategories().stream().map(IngredientCategory::getName).toList());
        foodDto.setIngredientsItemName(food.getIngredientsItems().stream().map(IngredientsItem::getName).toList());
        return foodDto;
    }

    public static SearchFoodDto foodToSearchFoodDto(Food food) {
        SearchFoodDto searchFoodDto = new SearchFoodDto();
        searchFoodDto.setId(food.getId());
        searchFoodDto.setName(food.getName());
        searchFoodDto.setPrice(food.getPrice());
        searchFoodDto.setImage(food.getImage1());
        searchFoodDto.setRestaurantId(food.getRestaurants().getId());
        searchFoodDto.setRestaurantName(food.getRestaurants().getName());
        return searchFoodDto;
    }
}
