package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.FoodCategoryService;
import org.example.onlinefoodorderingbackend.dto.FoodCategoryDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/food_category")
public class FoodCategoryController { //

    private final FoodCategoryService foodCategoryService;


    @PostMapping("/create")
    public ResponseEntity<String> createFoodCategory(@RequestBody FoodCategoryDto foodCategoryDto) {
        foodCategoryService.createFoodCategoryDto(foodCategoryDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created food category");
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodCategoryDto>> getFoodCategoryByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(foodCategoryService.getFoodCategoryByRestaurantId(restaurantId));
    }

    @GetMapping("/{foodCategoryId}")
    public ResponseEntity<FoodCategoryDto> getFoodCategoryById(@PathVariable("foodCategoryId") Long foodCategoryId) {
        return ResponseEntity.status(HttpStatus.OK).body(foodCategoryService.getFoodCategoryById(foodCategoryId));
    }


    @PutMapping("/")
    public ResponseEntity<String> updateFoodCategory(@RequestBody FoodCategoryDto foodCategoryDto) {
        foodCategoryService.updateFoodCategoryById(foodCategoryDto);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully updated");
    }


    @DeleteMapping("/delete/{foodCategoryId}")
    public ResponseEntity<String> deleteFoodCategoryById(@PathVariable("foodCategoryId") Long foodCategoryId) {
        foodCategoryService.deleteFoodCategoryById(foodCategoryId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Delete FoodCategory");
    }
}
