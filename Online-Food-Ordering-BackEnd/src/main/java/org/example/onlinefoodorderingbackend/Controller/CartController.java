package org.example.onlinefoodorderingbackend.Controller;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.CartService;
import org.example.onlinefoodorderingbackend.dto.CartDto;
import org.example.onlinefoodorderingbackend.dto.CartItemDto;
import org.example.onlinefoodorderingbackend.dto.CartTotalPriceAndItemDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    @PutMapping("/add_item/userId/{userId}")
    public ResponseEntity<String> addCartItem(@RequestBody CartItemDto cartItemDto, @PathVariable("userId") Long userId) {
        cartService.addCartItemToCart(cartItemDto, userId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully Added To Cart!");
    }


    @DeleteMapping("/cart_itemId/{cartItemId}/userId/{userId}")
    public ResponseEntity<String> removeCartItem(@PathVariable("cartItemId") Long cartItemId,@PathVariable("userId") Long userId) {
        cartService.removeCartItemFromCart(cartItemId, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully removed cart item");
    }


    @PutMapping("/clear_cart/{userId}")
    public ResponseEntity<String> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully cleared cart item");
    }


    @GetMapping("/{cartId}")
    public ResponseEntity<CartDto> getCartById(@PathVariable("cartId") Long cartId) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartById(cartId));
    }


    @GetMapping("/userId/{userId}")
    public ResponseEntity<CartDto> getCartByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.getCartByUserId(userId));
    }

    @PutMapping("/cart_total_price/{cartId}")
    public ResponseEntity<CartTotalPriceAndItemDto> getCartTotalPrice(@PathVariable("cartId") Long cartId) {
        return ResponseEntity.status(HttpStatus.OK).body(cartService.cartTotalPrice(cartId));
    }

    @PutMapping("/cartId/{cartItemId}/add_quantity/{quantity}")
    public ResponseEntity<String> addCartQuantity(@PathVariable("cartItemId") Long cartItemId,@PathVariable("quantity") Integer quantity) {
        cartService.addCartItemQuantity(cartItemId, quantity);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully");
    }


}
