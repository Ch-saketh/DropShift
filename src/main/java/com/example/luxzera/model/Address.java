package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    // Explicitly use the full path to avoid any package resolution bugs
    @NotNull(message = "User relationship required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Recipient name is required")
    @Column(name = "recipient_name", nullable = false, length = 100)
    private String recipientName;

    @NotBlank(message = "Street address is required")
    @Column(name = "street_address", nullable = false)
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @NotBlank(message = "State is required")
    @Column(name = "state", nullable = false, length = 50)
    private String state;

    @NotBlank(message = "Country is required")
    @Column(name = "country", nullable = false, length = 50)
    private String country;

    @NotBlank(message = "Postal code is essential")
    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;

    @NotNull
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;

    public Address() {
    }

    // Explicit path used here in the constructor argument too
    public Address(com.example.luxzera.model.User user, String recipientName, String streetAddress, String city, String state, String country, String postalCode, Boolean isDefault) {
        this.user = user;
        this.recipientName = recipientName;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.isDefault = isDefault;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    // Explicit path used in Getters and Setters
    public com.example.luxzera.model.User getUser() { return user; }
    public void setUser(com.example.luxzera.model.User user) { this.user = user; }

    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }

    public String getStreetAddress() { return streetAddress; }
    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }
}