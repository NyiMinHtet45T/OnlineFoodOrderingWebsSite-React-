package org.example.onlinefoodorderingbackend.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.example.onlinefoodorderingbackend.dto.OrderDto;
import org.example.onlinefoodorderingbackend.dto.PaymentResponse;
import org.example.onlinefoodorderingbackend.model.Order;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${strip.api.secret}")
    public String stripSecretKey;

    public final OrderService orderService;

    public PaymentResponse createPaymentLink(OrderDto orderDto) throws StripeException {

        Order order = orderService.initOrder(orderDto);

        Stripe.apiKey = stripSecretKey;

        SessionCreateParams params = SessionCreateParams
                .builder().addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/payment/success/"+order.getId())
                .setCancelUrl("http://localhost:5173/payment/fail")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount((long) order.getTotalPrice() * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Nyi Food").build())
                                .build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        PaymentResponse response = new PaymentResponse();
        response.setPayment_url(session.getUrl());
        return response;
    }
}
