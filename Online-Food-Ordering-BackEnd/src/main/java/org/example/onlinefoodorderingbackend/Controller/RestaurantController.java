package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.RestaurantService;
import org.example.onlinefoodorderingbackend.dto.RestaurantDto;
import org.example.onlinefoodorderingbackend.dto.RestaurantListResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/restaurant")
public class RestaurantController { //

    private final RestaurantService restaurantService;

    @GetMapping("/search/{query}")
    public ResponseEntity<List<RestaurantDto>> searchRestaurantByQuery(@PathVariable("query") String query) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(restaurantService.searchRestaurant(query));
    }

    @GetMapping("/list_restaurant")
    public ResponseEntity<List<RestaurantListResponseDto>> getAllRestaurants(@RequestParam(required = false) Long userId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(restaurantService.getAllRestaurants(userId));
    }

    @GetMapping("/by_restaurantId/{restaurantId}")
    public ResponseEntity<RestaurantDto> getRestaurantById(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(restaurantService.getRestaurantById(restaurantId));
    }

    @PutMapping("/{restaurantId}/{userId}/add_to_favourite")
    public ResponseEntity<String> addToFavouriteRestaurant(@PathVariable("restaurantId") Long restaurantId, @PathVariable("userId") Long userId) {

        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.addToFavourite(restaurantId, userId));
    }

    @GetMapping("/get_favourite/{userId}")
    public ResponseEntity<List<RestaurantListResponseDto>> getAllFavouriteRestaurants(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.getFavouriteRestaurants(userId));
    }


}
