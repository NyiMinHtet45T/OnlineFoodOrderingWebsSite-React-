package org.example.onlinefoodorderingbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private long totalPrice;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Food food;

    @ElementCollection
    private List<String> ingredients;


    public CartItem(int quantity, long totalPrice) {
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }
}
