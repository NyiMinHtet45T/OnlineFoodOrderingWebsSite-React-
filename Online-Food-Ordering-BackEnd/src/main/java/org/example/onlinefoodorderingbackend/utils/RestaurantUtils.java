package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.RestaurantDto;
import org.example.onlinefoodorderingbackend.dto.RestaurantListResponseDto;
import org.example.onlinefoodorderingbackend.model.Restaurant;

import java.time.LocalDateTime;


public class RestaurantUtils {

    public static Restaurant restaurantDtoToRestaurant(RestaurantDto restaurantDto) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(restaurantDto.getName());
        restaurant.setDescription(restaurantDto.getDescription());
        restaurant.setCuisineType(restaurantDto.getCuisineType());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOpen(restaurantDto.isOpen());
        restaurant.setOpeningHours(restaurantDto.getOpeningHours());
        restaurant.setImages(restaurantDto.getImage());
        return restaurant;
    }

    public static RestaurantDto restaurantToRestaurantDto(Restaurant restaurant) {
        RestaurantDto restaurantDto = new RestaurantDto();
        restaurantDto.setId(restaurant.getId());
        restaurantDto.setName(restaurant.getName());
        restaurantDto.setDescription(restaurant.getDescription());
        restaurantDto.setCuisineType(restaurant.getCuisineType());
        restaurantDto.setRegistrationDate(restaurant.getRegistrationDate());
        restaurantDto.setOpen(restaurant.isOpen());
        restaurantDto.setOpeningHours(restaurant.getOpeningHours());
        restaurantDto.setImage(restaurant.getImages());
        restaurantDto.setOwnerId(restaurant.getOwner().getId());
        restaurantDto.setContactInformation(restaurant.getContactInformation());
        restaurantDto.setAddress(restaurant.getAddress());
        restaurantDto.setOwnerName(restaurant.getOwner().getUserName());
        return restaurantDto;
    }

    public static RestaurantListResponseDto getRestaurantListResponse(Restaurant restaurant, boolean isFavourite) {
        RestaurantListResponseDto restaurantListResponse = new RestaurantListResponseDto();
        restaurantListResponse.setId(restaurant.getId());
        restaurantListResponse.setName(restaurant.getName());
        restaurantListResponse.setDescription(restaurant.getDescription());
        restaurantListResponse.setOpen(restaurant.isOpen());
        restaurantListResponse.setImage(restaurant.getImages());
        restaurantListResponse.setFavourite(isFavourite);
        return restaurantListResponse;
    }
}
