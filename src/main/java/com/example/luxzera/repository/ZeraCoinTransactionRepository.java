package com.example.luxzera.repository;

import com.example.luxzera.model.ZeraCoinTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ZeraCoinTransactionRepository extends JpaRepository<ZeraCoinTransaction, UUID> {
    List<ZeraCoinTransaction> findByUserIdOrderByTimestampDesc(UUID userId); // Powers the user's ledger view
}