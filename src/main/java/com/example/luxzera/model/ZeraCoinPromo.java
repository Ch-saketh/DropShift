package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "zera_coin_promos", indexes = {
        @Index(name = "idx_zera_promos_code", columnList = "promo_code", unique = true)
})
public class ZeraCoinPromo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank
    @Column(name = "promo_code", nullable = false, unique = true, length = 30)
    private String promoCode; // e.g., "ZERADROP100"

    @NotNull
    @Column(name = "coin_value", nullable = false)
    private Integer coinValue; // How many Zera Coins this coupon instantly awards or costs

    @NotNull
    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public ZeraCoinPromo() {}

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getPromoCode() { return promoCode; }
    public void setPromoCode(String promoCode) { this.promoCode = promoCode; }
    public Integer getCoinValue() { return coinValue; }
    public void setCoinValue(Integer coinValue) { this.coinValue = coinValue; }
    public LocalDateTime getExpirationTime() { return expirationTime; }
    public void setExpirationTime(LocalDateTime expirationTime) { this.expirationTime = expirationTime; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}