package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.FoodService;
import org.example.onlinefoodorderingbackend.dto.FoodDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/food")
public class AdminFoodController { //

    private final FoodService foodService;

    @PostMapping("/create_food")
    public ResponseEntity<String> createFood(@RequestBody FoodDto foodDto) {
        foodService.createFood(foodDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully created food");
    }

    @DeleteMapping("/{foodId}")
    public ResponseEntity<String> deleteFoodById(@PathVariable("foodId") Long foodId) {
        foodService.deleteFood(foodId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted the food");
    }

    @PatchMapping("/{foodId}/availability")
    public ResponseEntity<Boolean> updateFoodAvailability(@PathVariable("foodId") Long foodId) {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.updateFoodAvailability(foodId));
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateFood(@RequestBody FoodDto foodDto) {
        foodService.updateFood(foodDto);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully updated the food");
    }
}
