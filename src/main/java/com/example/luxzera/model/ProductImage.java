package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL;
import java.util.UUID;

@Entity
@Table(name = "product_images", indexes = {
        @Index(name = "idx_product_images_order", columnList = "product_id, display_order")
})
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull(message = "Product parent reference is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotBlank(message = "Image URL is required")
    @URL(message = "Must be a valid media asset link")
    @Column(name = "image_url", nullable = false, length = 512)
    private String imageUrl;

    @NotNull(message = "Display sequence order is required")
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    public ProductImage() {
    }

    public ProductImage(Product product, String imageUrl, Integer displayOrder) {
        this.product = product;
        this.imageUrl = imageUrl;
        this.displayOrder = displayOrder;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}