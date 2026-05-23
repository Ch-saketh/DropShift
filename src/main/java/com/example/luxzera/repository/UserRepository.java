package com.example.luxzera.repository;

import com.example.luxzera.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Looks up a customer by their unique email during login sessions
    Optional<User> findByEmail(String email);

    // Looks up a customer by their custom unique platform handle
    Optional<User> findByUsername(String username);
}