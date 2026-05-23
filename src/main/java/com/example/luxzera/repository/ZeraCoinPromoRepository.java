package com.example.luxzera.repository;

import com.example.luxzera.model.ZeraCoinPromo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ZeraCoinPromoRepository extends JpaRepository<ZeraCoinPromo, UUID> {
    Optional<ZeraCoinPromo> findByPromoCodeAndIsActiveTrue(String promoCode);
}