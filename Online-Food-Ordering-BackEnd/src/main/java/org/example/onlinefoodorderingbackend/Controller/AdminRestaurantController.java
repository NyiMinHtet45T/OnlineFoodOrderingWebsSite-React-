package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.RestaurantService;
import org.example.onlinefoodorderingbackend.dto.RestaurantDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/restaurant")
public class AdminRestaurantController { //

    private final RestaurantService restaurantService;


    @PostMapping("/create_restaurant")
    public ResponseEntity<RestaurantDto> createRestaurant(@RequestBody RestaurantDto restaurantDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.createRestaurant(restaurantDto));
    }


    @PutMapping("/update_restaurant")
    public ResponseEntity<RestaurantDto> updateRestaurant(@RequestBody RestaurantDto restaurantDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurantService.updateRestaurant(restaurantDto));
    }


    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        restaurantService.deleteRestaurant(restaurantId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully deleted restaurant");
    }


    @PatchMapping("/{restaurantId}/state")
    public ResponseEntity<Boolean> updateRestaurantState(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.updateRestaurantState(restaurantId));
    }


    @GetMapping("/by_ownerId/{ownerId}")
    public ResponseEntity<RestaurantDto> getRestaurantByOwnerId(@PathVariable("ownerId") Long ownerId) {
        return ResponseEntity.status(HttpStatus.OK).body(restaurantService.getRestaurantByOwnerId(ownerId));
    }
}
