package org.example.onlinefoodorderingbackend.utils;

import org.example.onlinefoodorderingbackend.dto.CartDto;
import org.example.onlinefoodorderingbackend.dto.CartItemDto;
import org.example.onlinefoodorderingbackend.model.Cart;
import org.example.onlinefoodorderingbackend.model.CartItem;

import java.util.ArrayList;
import java.util.List;

public class CartUtils {

    public static CartItem cartItemDtoToCartItem(CartItemDto cartItemDto) {
        CartItem cartItem = new CartItem();
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setTotalPrice(cartItemDto.getTotalPrice());
        cartItem.setIngredients(cartItemDto.getIngredients());
        return cartItem;
    }

    public static CartItemDto cartItemToCartItemDto(CartItem cartItem) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItem.getId());
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setTotalPrice(cartItem.getTotalPrice());
        cartItemDto.setIngredients(cartItem.getIngredients());
        cartItemDto.setFoodId(cartItem.getFood().getId());
        return cartItemDto;
    }

    public static CartDto cartToCartDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setTotal(cart.getTotal());
        cartDto.setUserId(cart.getUser().getId());
        List<CartItemDto> cartItemDtos = new ArrayList<>();
        for(CartItem cartItem :  cart.getCartItems()) {
            CartItemDto cartItemDto = cartItemToCartItemDto(cartItem);
            cartItemDto.setImage(cartItem.getFood().getImage1());
            cartItemDto.setFoodName(cartItem.getFood().getName());
            cartItemDtos.add(cartItemDto);
        }
        cartDto.setCartItemDto(cartItemDtos);

        return cartDto;
    }
}
