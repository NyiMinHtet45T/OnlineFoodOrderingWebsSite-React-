package org.example.onlinefoodorderingbackend.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.RestaurantDao;
import org.example.onlinefoodorderingbackend.dao.UserDao;
import org.example.onlinefoodorderingbackend.dto.RestaurantDto;
import org.example.onlinefoodorderingbackend.dto.RestaurantListResponseDto;
import org.example.onlinefoodorderingbackend.model.Restaurant;
import org.example.onlinefoodorderingbackend.model.User;
import org.example.onlinefoodorderingbackend.utils.RestaurantUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantDao restaurantDao;
    private final UserDao userDao;

    public RestaurantDto createRestaurant(RestaurantDto restaurantDto) {
       return RestaurantUtils.restaurantToRestaurantDto(restaurantDao.save(initRestaurantObject(restaurantDto, true)));
    }

    public RestaurantDto updateRestaurant(RestaurantDto restaurantDto) {
        if(restaurantDao.existsById(restaurantDto.getId())) {
            Restaurant restaurant = initRestaurantObject(restaurantDto, false);
            restaurant.setId(restaurantDto.getId());
            Restaurant updatedRestaurant = restaurantDao.save(restaurant);
            return RestaurantUtils.restaurantToRestaurantDto(updatedRestaurant);
        }
        throw new UsernameNotFoundException("Restaurant not found");
    }

    public void deleteRestaurant(Long restaurantId) {
        Restaurant restaurant = restaurantDao.findById(restaurantId).orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
        restaurantDao.delete(restaurant);
    }

    public List<RestaurantListResponseDto> getAllRestaurants(Long userId) {
        if(userId == null) {
            return restaurantDao.findAll()
                    .stream()
                    .map(restaurant -> RestaurantUtils.getRestaurantListResponse(restaurant, false))
                    .toList();
        }
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Restaurant> favourites = user.getFavourites();
        return restaurantDao.findAll()
                .stream()
                .map(restaurant -> isThereFavouriteRestaurant(favourites, restaurant)).toList();
    }

    private RestaurantListResponseDto isThereFavouriteRestaurant(List<Restaurant> favourites, Restaurant restaurant) {
        boolean isFavourite = favourites.contains(restaurant);
        return RestaurantUtils.getRestaurantListResponse(restaurant, isFavourite);
    }

    public List<RestaurantDto> searchRestaurant(String query) {
        return restaurantDao.searchRestaurantByQuery(query)
                .orElse(new ArrayList<>())
                .stream()
                .map(RestaurantUtils::restaurantToRestaurantDto)
                .toList();
    }

    public RestaurantDto getRestaurantById(Long restaurantId) {
        return RestaurantUtils
                .restaurantToRestaurantDto(restaurantDao.findById(restaurantId).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found")));
    }

    public RestaurantDto getRestaurantByOwnerId(Long ownerId) {
        return RestaurantUtils.restaurantToRestaurantDto(restaurantDao.findRestaurantByOwnerId(ownerId).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found")));
    }

    @Transactional
    public String addToFavourite(Long restaurantId, Long userId) {
        Restaurant restaurant = restaurantDao.findById(restaurantId).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found"));
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if(user.getFavourites().contains(restaurant)) {
            user.getFavourites().remove(restaurant);
            userDao.save(user);
            return "Successfully Removed from Favourites!";
        }else {
            user.addFavourite(restaurant);
        }
        userDao.save(user);
        return "Successfully Added to Favourites!";
    }

    public List<RestaurantListResponseDto> getFavouriteRestaurants(Long userId) {
        User user = userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getFavourites()
                .stream()
                .map(restaurant -> RestaurantUtils.getRestaurantListResponse(restaurant, true))
                .toList();
    }

    public Boolean updateRestaurantState(Long restaurantId) {
        Restaurant restaurant = restaurantDao.findById(restaurantId).orElseThrow(() -> new UsernameNotFoundException("Restaurant not found"));
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantDao.save(restaurant).isOpen();
    }

    private Restaurant initRestaurantObject(RestaurantDto restaurantDto, Boolean create) { // making initial method
        Restaurant restaurant = RestaurantUtils.restaurantDtoToRestaurant(restaurantDto);
        User user = userDao.findById(restaurantDto.getOwnerId()).orElseThrow(() -> new UsernameNotFoundException("Owner not found"));
        if(create) {
            user.addRestaurant(restaurant);
        }
        restaurant.setOwner(user);
        restaurant.setContactInformation(restaurantDto.getContactInformation());
        restaurant.setAddress(restaurantDto.getAddress());
        return restaurant;
    }
}
