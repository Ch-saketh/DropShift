package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "product_feedback", indexes = {
        @Index(name = "idx_feedback_product_user", columnList = "product_id, user_id")
})
public class ProductFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Min(1) @Max(5)
    @Column(name = "rating", nullable = false)
    private Integer rating; // 1 to 5 star rating metric[cite: 1]

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment; // Detailed text review content[cite: 1]

    @NotNull
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // CASCADE TYPE ALL + ORPHAN REMOVAL GUARANTEES:
    // If a user deletes their feedback, all associated videos, images, and audio records are completely wiped automatically.
    @OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FeedbackMedia> mediaAttachments = new ArrayList<>();

    public ProductFeedback() {}

    public ProductFeedback(Product product, User user, Integer rating, String comment) {
        this.product = product;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public List<FeedbackMedia> getMediaAttachments() { return mediaAttachments; }
    public void setMediaAttachments(List<FeedbackMedia> mediaAttachments) { this.mediaAttachments = mediaAttachments; }
}