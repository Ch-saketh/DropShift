package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "bag_items", indexes = {
        @Index(name = "idx_bag_items_lookup", columnList = "bag_id, variant_id")
})
public class BagItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bag_id", nullable = false)
    private Bag bag;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant; // Ties directly to the exact sizing inventory node selected

    @NotNull
    @Min(value = 1, message = "Bag line items must contain at least 1 unit")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    public BagItem() {}

    public BagItem(Bag bag, ProductVariant variant, Integer quantity) {
        this.bag = bag;
        this.variant = variant;
        this.quantity = quantity;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Bag getBag() { return bag; }
    public void setBag(Bag bag) { this.bag = bag; }
    public ProductVariant getVariant() { return variant; }
    public void setVariant(ProductVariant variant) { this.variant = variant; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}