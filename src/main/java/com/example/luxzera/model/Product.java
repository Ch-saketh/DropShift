package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products", indexes = {
        // HIGH-SPEED FRONTEND FILTER INDEX: Groups criteria checks into a single B-Tree traversal
        @Index(name = "idx_products_filter_search", columnList = "category_id, demographic, is_active")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Product name is required")
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Base price is required")
    @PositiveOrZero(message = "Price cannot be negative")
    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @NotBlank(message = "Demographic targeting is required")
    @Column(name = "demographic", nullable = false, length = 20)
    private String demographic; // Supports "MEN", "WOMEN", "UNISEX" filters directly

    @NotNull(message = "Assigned category layout is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category; // Cascades back to discover the parent department cleanly

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "attributes", columnDefinition = "jsonb")
    private String attributes; // {"movement": "automatic"} for watches, {"fit": "oversized"} for tops

    @Column(name = "embedding", columnDefinition = "vector(384)")
    private float[] embedding;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    private List<ProductImage> images = new ArrayList<>();

    public Product() {}

    public Product(String name, String description, BigDecimal basePrice, String demographic, Category category, String attributes, float[] embedding) {
        this.name = name;
        this.description = description;
        this.basePrice = basePrice;
        this.demographic = demographic;
        this.category = category;
        this.attributes = attributes;
        this.embedding = embedding;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }
    public String getDemographic() { return demographic; }
    public void setDemographic(String demographic) { this.demographic = demographic; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    public String getAttributes() { return attributes; }
    public void setAttributes(String attributes) { this.attributes = attributes; }
    public float[] getEmbedding() { return embedding; }
    public void setEmbedding(float[] embedding) { this.embedding = embedding; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public List<ProductImage> getImages() { return images; }
    public void setImages(List<ProductImage> images) { this.images = images; }

    // ==========================================
    // PASTE THE AUDIT TIMESTAMPS RIGHT HERE
    // ==========================================
    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = java.time.LocalDateTime.now();
    }

    public java.time.LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
} // <--- This is the absolute last closing bracket of the class file
