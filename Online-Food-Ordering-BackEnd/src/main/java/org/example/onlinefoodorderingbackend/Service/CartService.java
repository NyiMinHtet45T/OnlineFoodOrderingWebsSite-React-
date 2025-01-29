package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.CartDao;
import org.example.onlinefoodorderingbackend.dao.CartItemDao;
import org.example.onlinefoodorderingbackend.dao.FoodDao;
import org.example.onlinefoodorderingbackend.dao.UserDao;
import org.example.onlinefoodorderingbackend.dto.CartDto;
import org.example.onlinefoodorderingbackend.dto.CartItemDto;
import org.example.onlinefoodorderingbackend.dto.CartTotalPriceAndItemDto;
import org.example.onlinefoodorderingbackend.model.Cart;
import org.example.onlinefoodorderingbackend.model.CartItem;
import org.example.onlinefoodorderingbackend.model.Food;
import org.example.onlinefoodorderingbackend.utils.CartUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartDao cartDao;
    private final CartItemDao cartItemDao;
    private final UserDao userDao;
    private final FoodDao foodDao;

    public void addCartItemToCart(CartItemDto cartItemDto, Long userId) {

        Cart existCart = cartDao.findCartByUserId(userId).orElse(null);

        Food food = foodDao.findById(cartItemDto.getFoodId()).orElseThrow(() -> new UsernameNotFoundException("Food not found"));

        if(existCart != null) {
            Optional<CartItem> existingCartItem = existCart.getCartItems()
                    .stream()
                    .filter(cartItem -> cartItem.getFood().equals(food)).findFirst();
                if(existingCartItem.isPresent()) {
                    CartItem cartItem = existingCartItem.get();
                    int quantity = cartItem.getQuantity() + cartItemDto.getQuantity();
                    addCartItemQuantity(cartItem.getId(), quantity);
                }else {
                    CartItem newCartItem = CartUtils.cartItemDtoToCartItem(cartItemDto);
                    newCartItem.setFood(food);
                    newCartItem.setCart(existCart);
                    existCart.addCartItem(newCartItem);
                }
            cartDao.save(existCart);
        }else {
            Cart newCart = new Cart();
            newCart.setTotal(0L);
            newCart.setTotalItem(0);
            newCart.setUser(userDao.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found")));

            CartItem newCartItem = CartUtils.cartItemDtoToCartItem(cartItemDto);
            newCartItem.setFood(food);
            newCartItem.setCart(newCart);
            newCart.addCartItem(newCartItem);
            cartDao.save(newCart);
        }
    }

    public void addCartItemQuantity(Long cartItemId, int quantity) {
    CartItem cartItem = cartItemDao.findById(cartItemId).orElseThrow(() -> new UsernameNotFoundException("Item not found"));
        cartItem.setQuantity(quantity);
        cartItem.setTotalPrice(cartItem.getFood().getPrice() * quantity);
        cartItemDao.save(cartItem);
    }

    @Transactional
    public void removeCartItemFromCart(Long cartItemId, Long userId) {
        Cart cart = cartDao.findCartByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        CartItem cartItem = cartItemDao.findById(cartItemId).orElseThrow(() -> new UsernameNotFoundException("C not found"));
        cart.getCartItems().remove(cartItem);
        cartDao.save(cart);
    }

    public CartTotalPriceAndItemDto cartTotalPrice(Long cartId) {
        long totalPrice = 0L;
        int totalItem = 0;
        Cart cart = cartDao.findById(cartId).orElseThrow(() -> new UsernameNotFoundException("Cart not found"));

        for(CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getTotalPrice();
            totalItem += cartItem.getQuantity();
        }
        cart.setTotal(totalPrice);
        cart.setTotalItem(totalItem);
        cartDao.save(cart);
        CartTotalPriceAndItemDto cartTotalPriceAndTotalItemDto = new CartTotalPriceAndItemDto();
        cartTotalPriceAndTotalItemDto.setCartTotalPrice(totalPrice);
        cartTotalPriceAndTotalItemDto.setCartTotalItems(totalItem);
        return cartTotalPriceAndTotalItemDto;
    }

    public CartDto getCartById(Long cartId) {
        return CartUtils.cartToCartDto(cartDao.findById(cartId).orElseThrow(() -> new UsernameNotFoundException("Cart not found")));
    }

    public CartDto getCartByUserId(Long userId) {
        return CartUtils.cartToCartDto(cartDao.findCartByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("Cart not found")));
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartDao.findCartByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("Cart not found"));
        cart.getCartItems().clear();
        cartDao.save(cart);
    }
}
