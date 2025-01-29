package org.example.onlinefoodorderingbackend.Service;

import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dao.*;
import org.example.onlinefoodorderingbackend.dto.OrderDto;
import org.example.onlinefoodorderingbackend.dto.OrderItemDto;
import org.example.onlinefoodorderingbackend.model.*;
import org.example.onlinefoodorderingbackend.utils.OrderUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderDao orderDao;
    private final OrderItemDao orderItemDao;
    private final UserDao userDao;
    private final RestaurantDao restaurantDao;
    private final CartDao cartDao;
    private final CartService cartService;
    private final AddressDao addressDao;

    @Transactional
    public void createOrder(OrderDto orderDto) {

        Order order = initOrder(orderDto);

        Cart cart = cartDao.findCartByUserId(order.getUser().getId()).orElseThrow(() -> new UsernameNotFoundException("Cart not found"));

        List<OrderItem> orderItems = new ArrayList<>();

        for(CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItem.setIngredients(new ArrayList<>(cartItem.getIngredients()));
            orderItem.setOrderItemState("PENDING");
            orderItem.setFood(cartItem.getFood());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);

        cartService.clearCart(orderDto.getUserId());
        orderDao.save(order);
    }

    public void updateOrderItemStatus(Long orderItemId, String orderStatus) {

        OrderItem orderItem = orderItemDao.findById(orderItemId).orElseThrow(() -> new UsernameNotFoundException("OrderItem Not Found!"));
        orderItem.setOrderItemState(orderStatus);
        orderItemDao.save(orderItem);
    }

    @Transactional
    public void cancelOrderItem(Long orderItemId) {
        if(!orderItemDao.existsById(orderItemId)) {
            throw new UsernameNotFoundException("Order not found");
        }
        orderItemDao.deleteById(orderItemId);
    }

    public List<OrderItemDto> getOrderByUserId(Long userId) {
        return orderItemDao.findOrderItemByUserId(userId)
                .orElse(new ArrayList<>())
                .stream()
                .map(this::getOrderItemDto)
                .toList();
    }

    public List<OrderItemDto> getOrderItemByRestaurantId(Long restaurantId, String orderStatus) {
        return orderItemDao.findOrderItemByRestaurantIdAndStatus(restaurantId,orderStatus)
                .stream()
                .map(this::getOrderItemDto)
                .toList();
    }

    private OrderItemDto getOrderItemDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setTotalPrice(orderItem.getTotalPrice());
        orderItemDto.setIngredients(orderItem.getIngredients());
        orderItemDto.setOrderItemState(orderItem.getOrderItemState());
        orderItemDto.setFoodImage(orderItem.getFood().getImage1());
        orderItemDto.setFoodName(orderItem.getFood().getName());
        orderItemDto.setCustomerName(orderItem.getOrder().getUser().getUserName());
        return orderItemDto;
    }

    public OrderDto getOrderById(Long orderId) {
        return OrderUtils.orderToDto(orderDao.findById(orderId).orElseThrow(() -> new UsernameNotFoundException("Order not found")));
    }

    public Order initOrder(OrderDto orderDto) {
        Order order = OrderUtils.orderDtoToOrder(orderDto);
        User user = userDao.findById(orderDto.getUserId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Address address = addressDao.findById(orderDto.getAddressId()).orElseThrow(() -> new UsernameNotFoundException("Address not found"));
        order.setUser(user);
        order.setAddress(address);
        user.addOrder(order);
        return order;
    }
}
