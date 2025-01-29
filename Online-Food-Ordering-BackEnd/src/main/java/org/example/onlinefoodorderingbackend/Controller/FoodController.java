package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.FoodService;
import org.example.onlinefoodorderingbackend.dto.FilterFoodDto;
import org.example.onlinefoodorderingbackend.dto.FoodDto;
import org.example.onlinefoodorderingbackend.dto.SearchFoodDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/food")
public class FoodController { //

    private final FoodService foodService;

    @GetMapping("/search/{query}")
    public ResponseEntity<List<SearchFoodDto>> searchFoodByQuery(@PathVariable("query") String query) {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.searchFood(query));
    }

    @PostMapping("/get_food_by_filter")
    public ResponseEntity<List<FoodDto>> getFoodByFilter(@RequestBody FilterFoodDto filterFoodDto) {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.getRestaurantFood(filterFoodDto));
    }

    @GetMapping("/{foodId}")
    public ResponseEntity<FoodDto> getFoodById(@PathVariable("foodId") Long foodId) {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.getFoodById(foodId));
    }

    @GetMapping("/restaurantId/{restaurantId}")
    public ResponseEntity<List<FoodDto>> getFoodByRestaurantId(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(foodService.getFoodByRestaurantId(restaurantId));
    }
}
