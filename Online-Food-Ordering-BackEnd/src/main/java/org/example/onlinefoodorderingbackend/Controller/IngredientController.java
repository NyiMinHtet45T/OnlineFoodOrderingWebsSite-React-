package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.IngredientService;
import org.example.onlinefoodorderingbackend.dto.IngredientCategoryDto;
import org.example.onlinefoodorderingbackend.dto.IngredientCategoryList;
import org.example.onlinefoodorderingbackend.dto.IngredientsItemDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/ingredients")
public class IngredientController { //

    private final IngredientService ingredientService;


    @PostMapping("/category")
    public ResponseEntity<String> createIngredientCategory(@RequestBody IngredientCategoryDto ingredientCategoryDto) {
        ingredientService.createIngredientCategory(ingredientCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created category");
    }


    @PutMapping("/category")
    public ResponseEntity<String> updateIngredientCategory(@RequestBody IngredientCategoryDto ingredientCategoryDto) {
        ingredientService.updateIngredientCategory(ingredientCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Category updated successfully");
    }


    @PostMapping("/create")
    public ResponseEntity<String> createIngredientsItem(@RequestBody IngredientsItemDto ingredientsItemDto) {
        ingredientService.createIngredientsItem(ingredientsItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created item");
    }

    @PutMapping("/")
    public ResponseEntity<String> updateIngredientItem(@RequestBody IngredientsItemDto ingredientsItemDto) {
        ingredientService.updateIngredientsItem(ingredientsItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Item updated successfully");
    }

    @PatchMapping("/{ingredientItemId}/stoke")
    public ResponseEntity<Boolean> updateIngredientsStoke(@PathVariable("ingredientItemId") Long ingredientItemId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.updateIngredientsStoke(ingredientItemId));
    }

    @PostMapping("/get_item_by_category_list")
    public ResponseEntity<List<IngredientsItemDto>> findIngredientItemByCategoryIdList(@RequestBody IngredientCategoryList ingredientCategoryList) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.getIngredientsItemsByCategoryId(ingredientCategoryList));
    }

    @GetMapping("/category/restaurantId/{restaurantId}")
    public ResponseEntity<List<IngredientCategoryDto>> findIngredientCategoryByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.getIngredientCategoryByRestaurantId(restaurantId));
    }

    @GetMapping("/restaurantId/{restaurantId}")
    public ResponseEntity<List<IngredientsItemDto>> getIngredientByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.getIngredientsItemByRestaurantId(restaurantId));
    }

    @GetMapping("/categoryId/{ingredientCategoryId}")
    public ResponseEntity<IngredientCategoryDto> findIngredientCategoryById(@PathVariable("ingredientCategoryId") Long ingredientCategoryId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.getIngredientCategoryById(ingredientCategoryId));
    }

    @GetMapping("/{ingredientItemId}")
    public ResponseEntity<IngredientsItemDto> findIngredientItemById(@PathVariable("ingredientItemId") Long ingredientItemId) {
        return ResponseEntity.status(HttpStatus.OK).body(ingredientService.getIngredientItemById(ingredientItemId));
    }


    @DeleteMapping("/delete_category/{ingredientCategoryId}")
    public ResponseEntity<String> deleteIngredientCategoryById(@PathVariable("ingredientCategoryId") Long ingredientCategoryId) {
        ingredientService.deleteIngredientCategoryById(ingredientCategoryId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted Category");
    }


    @DeleteMapping("/delete_ingredient/{ingredientItemId}")
    public ResponseEntity<String> deleteIngredientItemById(@PathVariable("ingredientItemId") Long ingredientItemId) {
        ingredientService.deleteIngredientItemById(ingredientItemId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted Ingredient");
    }


}
