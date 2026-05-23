package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "zera_coin_transactions", indexes = {
        @Index(name = "idx_zera_tx_user_id", columnList = "user_id")
})
public class ZeraCoinTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Integer amount; // Positive numbers for earnings (+50), negative for deductions (-100)

    @NotBlank
    @Column(name = "transaction_type", nullable = false, length = 30)
    private String transactionType; // e.g., "PURCHASE_REWARD", "PROMO_CODE_REDEMPTION", "REFUND"

    @Column(name = "description")
    private String description; // Additional context: "Used code ZERADROP100 on checkout"

    @NotNull
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public ZeraCoinTransaction() {}

    public ZeraCoinTransaction(User user, Integer amount, String transactionType, String description) {
        this.user = user;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Integer getAmount() { return amount; }
    public void setAmount(Integer amount) { this.amount = amount; }
    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}