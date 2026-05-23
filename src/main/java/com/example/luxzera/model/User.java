package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_users_username", columnList = "username", unique = true),
        @Index(name = "idx_users_email", columnList = "email", unique = true)
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Username is required")
    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @NotBlank(message = "Password hash is required")
    @Column(name = "password_hash", nullable = false, length = 60)
    private String passwordHash;

    @NotNull(message = "User role is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private AppUserRole role;

    public Integer getZeraCoinBalance() {
        return this.zeraCoinBalance;
    }

    public void setZeraCoinBalance(Integer zeraCoinBalance) {
        this.zeraCoinBalance = zeraCoinBalance;
    }

    public void addZeraCoins(Integer coins) {
        if (coins > 0) {
            this.zeraCoinBalance += coins;
        }
    }
    @NotNull
    @Column(name = "zera_coin_balance", nullable = false)
    private Integer zeraCoinBalance = 0;
    
    public void deductZeraCoins(Integer coins) {
        if (this.zeraCoinBalance >= coins) {
            this.zeraCoinBalance -= coins;
        } else {
            throw new IllegalArgumentException("Insufficient Zera Coin balance!");
        }
    }

    public User() {
    }

    public User(String username, String firstName, String lastName, String email, String passwordHash, AppUserRole role) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public AppUserRole getRole() { return role; }
    public void setRole(AppUserRole role) { this.role = role; }
}