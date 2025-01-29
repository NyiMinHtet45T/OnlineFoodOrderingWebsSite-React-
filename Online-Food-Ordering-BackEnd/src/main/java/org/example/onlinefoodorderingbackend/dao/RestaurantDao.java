package org.example.onlinefoodorderingbackend.dao;

import org.example.onlinefoodorderingbackend.model.Food;
import org.example.onlinefoodorderingbackend.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface RestaurantDao extends JpaRepository<Restaurant, Long> {

    @Query("""
select r from Restaurant r where lower(r.name)
like lower(concat('%', :query, '%'))
or lower(r.cuisineType) like lower(concat('%', :query, '%'))
""")
    Optional<List<Restaurant>> searchRestaurantByQuery(String query);

    
    @Query(" select r from Restaurant r where r.owner.id = :ownerId ")
    Optional<Restaurant> findRestaurantByOwnerId(Long ownerId);

}
