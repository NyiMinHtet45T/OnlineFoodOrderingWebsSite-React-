package org.example.onlinefoodorderingbackend;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.*;
import org.example.onlinefoodorderingbackend.model.*;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class OnlineFoodOrderingBackEndApplication {

    private final UserDao userDao;
    private final CartDao cartDao;
    private final RestaurantDao restaurantDao;
    private final OrderDao orderDao;
    private final FoodCategoryDao foodCategoryDao;
    private final IngredientCategoryDao ingredientCategoryDao;
    private final FoodDao foodDao;

    @Bean @Transactional
    @Profile("dev")
    public ApplicationRunner init(RoleDao roleDao) { // For Testing
        return args -> {

            Role customer = new Role("ROLE_CUSTOMER");
            Role owner = new Role("ROLE_OWNER");
            Role admin = new Role("ROLE_ADMIN");

            roleDao.save(customer);
            roleDao.save(owner);
            roleDao.save(admin);
//
//            //================================x
//
//            Address address1 = new Address("Yangon", "Yangon", "Okkala, 123", "Myanmar");
//            Address address2 = new Address("Mandalay", "Mandalay", "MgMglay, 837", "Myanmar");
//
//            //================================x
//
//            User NyiMinHtet = new User("NyiMinHtet", "Nyi@gmail.com", "1234", "09983727746");
//            User HlaHla = new User("HlaHla", "Hla@gmail.com", "3456", "09983726346");
//            User MyaMya = new User("MyaMya", "Mya@gmail.com", "6789", "09233727746");
//            NyiMinHtet.addRole(owner);
//            HlaHla.addRole(customer);
//            HlaHla.addAddress(address1);
//
//            userDao.save(NyiMinHtet);
//            userDao.save(HlaHla);
//
//            //================================x
//
//            ContactInformation contactInformation1 = new ContactInformation("HaHar@gmail.com","0938232737","twitter","inst8882");
//            ContactInformation contactInformation2 = new ContactInformation("bubble@gmail.com","09310012737","twitter","inst0182");
//
////            contactInformationDao.save(contactInformation1);
//
//            //================================x
//
//            Restaurant restaurant1 = new Restaurant("MaHarYangon", "", "cafe", LocalDateTime.now(), true, "Mon-Sun: 9:00AM 9:PM");
//            restaurant1.setImages(List.of("img1","img2"));
//            restaurant1.setOwner(NyiMinHtet);
//            restaurant1.setContactInformation(contactInformation1);
//            restaurant1.setAddress(address2);
//
//            restaurantDao.save(restaurant1);
//
//            NyiMinHtet.addRestaurant(restaurant1);
//            HlaHla.addFavourite(restaurant1);
//
//            //==================================x
//
//            FoodCategory foodCategory1 = new FoodCategory("chicken");
//            foodCategory1.setRestaurant(restaurant1);
//
//            foodCategoryDao.save(foodCategory1);
//            //==================================x
//
//            Food food1 = new Food("ChickenSpicy", "", 3000, true, false, false, true, LocalDate.now());
//            food1.setImages(List.of("img1", "img2"));
//            food1.setFoodCategory(foodCategory1);
//            food1.setRestaurants(restaurant1);
//
//            foodDao.save(food1);
//
//            foodCategory1.addFood(food1);
//            restaurant1.addFood(food1);
//
//            //=====================================x
//
//            IngredientCategory ingredientCategory1 = new IngredientCategory("Leaf");
//            ingredientCategory1.setRestaurant(restaurant1);
//
//            ingredientCategoryDao.save(ingredientCategory1);
//
//            //=====================================x
//
//            IngredientsItem ingredientsItem1 = new IngredientsItem("MangoLeaf");
//            ingredientsItem1.setIngredientCategory(ingredientCategory1);
//            ingredientsItem1.setRestaurant(restaurant1);
//
//            ingredientCategory1.addIngredientsItem(ingredientsItem1);
//            food1.addIngredientItem(ingredientsItem1);
//            //======================================
//
//            Cart cart1 = new Cart(15000);
//            cart1.setUser(HlaHla);
//
//            //=====================================
//
//            CartItem cartItem1 = new CartItem(3, 15000);
//            cartItem1.setIngredients(List.of("mangoLeaf"));
//            cartItem1.setCart(cart1);
//            cartItem1.setFood(food1);
//
//            cart1.addCartItem(cartItem1);
//
//            //=====================================x
//
//            Order order1 = new Order("Pending", LocalDate.now(), 3, 15000);
//            order1.setUser(HlaHla);
//            order1.setRestaurant(restaurant1);
//            order1.setAddress(address1);
//
//            HlaHla.addOrder(order1);
//            restaurant1.addOrder(order1);
//
//            restaurantDao.save(restaurant1);
//
//            //===================================== x
//
//            OrderItem orderItem1 = new OrderItem(3,5000);
//            orderItem1.setIngredients(List.of("mangoLeaf"));
//            orderItem1.setOrder(order1);
//            orderItem1.setFood(food1);
//
//            order1.addOrderItem(orderItem1);
//
//            orderDao.save(order1);
//            cartDao.save(cart1);
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(OnlineFoodOrderingBackEndApplication.class, args);
    }

}
