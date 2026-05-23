package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.util.UUID;

@Table(name = "product_variants", indexes = {
        @Index(name = "idx_variants_sku", columnList = "sku", unique = true)
})
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull(message = "Parent product reference is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotBlank(message = "Size configuration is required")
    @Column(name = "size", nullable = false, length = 10)
    private String size;

    @NotBlank(message = "Color variant is required")
    @Column(name = "color", nullable = false, length = 30)
    private String color;

    @NotNull(message = "Stock quantity count is required")
    @PositiveOrZero(message = "Stock cannot drop below zero")
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @NotBlank(message = "Unique variant SKU barcode is required")
    @Column(name = "sku", nullable = false, unique = true, length = 50)
    private String sku;

    // High Concurrency Race Condition Guard: Optimistic Locking
    @Version
    @Column(name = "version")
    private Long version;

    public ProductVariant() {
    }

    public ProductVariant(Product product, String size, String color, Integer stockQuantity, String sku) {
        this.product = product;
        this.size = size;
        this.color = color;
        this.stockQuantity = stockQuantity;
        this.sku = sku;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}