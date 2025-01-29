package org.example.onlinefoodorderingbackend.Controller;

import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.Service.OrderService;
import org.example.onlinefoodorderingbackend.Service.PaymentService;
import org.example.onlinefoodorderingbackend.dto.OrderDto;
import org.example.onlinefoodorderingbackend.dto.OrderItemDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    private final PaymentService paymentService;


    @PostMapping("/create_order")
    public ResponseEntity<String> createOrder(@RequestBody OrderDto orderDto) throws StripeException {
        orderService.createOrder(orderDto);
//        PaymentResponse paymentResponse = paymentService.createPaymentLink(orderDto); stripe payment service
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully Order!");
    }

    @PatchMapping("/{orderId}/order_status/{orderStatus}")
    public ResponseEntity<String> updateOrderItemStatus(@PathVariable("orderId") Long orderId, @PathVariable("orderStatus") String orderStatus) {
        orderService.updateOrderItemStatus(orderId, orderStatus);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully create Order");
    }

    @DeleteMapping("/{orderItemId}")
    public ResponseEntity<String> cancelOrderItem(@PathVariable("orderItemId") Long orderItemId) {
        orderService.cancelOrderItem(orderItemId);
        return ResponseEntity.status(HttpStatus.OK).body("Order cancelled");
    }

    @GetMapping("/userId/{userId}")
    public ResponseEntity<List<OrderItemDto>> getOrderByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderByUserId(userId));
    }

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<OrderItemDto>> getOrderItemByRestaurantId(@PathVariable("restaurantId") Long restaurantId, @RequestParam(required = false) String orderStatus) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrderItemByRestaurantId(restaurantId, orderStatus));
    }

}
