package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "feedback_media")
public class FeedbackMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id", nullable = false)
    private ProductFeedback feedback;

    @NotBlank
    @Column(name = "media_url", nullable = false, length = 512)
    private String mediaUrl; // CDN link tracking back to stored s3 file paths

    @NotBlank
    @Column(name = "media_type", nullable = false, length = 20)
    private String mediaType; // Explicit validation key: "IMAGE", "VIDEO", or "AUDIO"

    public FeedbackMedia() {}

    public FeedbackMedia(ProductFeedback feedback, String mediaUrl, String mediaType) {
        this.feedback = feedback;
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public ProductFeedback getFeedback() { return feedback; }
    public void setFeedback(ProductFeedback feedback) { this.feedback = feedback; }
    public String getMediaUrl() { return mediaUrl; }
    public void setMediaUrl(String mediaUrl) { this.mediaUrl = mediaUrl; }
    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }
}