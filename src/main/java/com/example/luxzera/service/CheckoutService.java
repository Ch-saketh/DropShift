package com.example.luxzera.service;

import com.example.luxzera.model.*;
import com.example.luxzera.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.UUID;

@Service
public class CheckoutService {

    private final UserRepository userRepository;
    private final ProductVariantRepository variantRepository;
    private final ZeraCoinPromoRepository promoRepository;

    public CheckoutService(UserRepository userRepository,
                           ProductVariantRepository variantRepository,
                           ZeraCoinPromoRepository promoRepository) {
        this.userRepository = userRepository;
        this.variantRepository = variantRepository;
        this.promoRepository = promoRepository;
    }

    @Transactional
    public void processHypeDropCheckout(UUID userId, UUID variantId, int quantity, String promoCode) {
        // 1. Fetch user and their wallet
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. CRITICAL CONCURRENCY SAFEGUARD: Acquire exclusive row-level DB write block
        // This ensures two users cannot grab the same limited hoodie stock during a drop window.
        ProductVariant variant = variantRepository.findByIdForUpdate(variantId)
                .orElseThrow(() -> new RuntimeException("Product variant stock node not found"));

        // 3. Stock Check
        if (variant.getStockQuantity() < quantity) {
            throw new IllegalStateException("Drop Sold Out! Insufficient inventory available.");
        }

        // 4. Calculate core pricing details
        BigDecimal unitPrice = variant.getProduct().getBasePrice();
        BigDecimal totalAmount = unitPrice.multiply(BigDecimal.valueOf(quantity));

        // 5. PROMO & LOYALTY RUNTIME: Process Zera Coin logic if a code is provided
        if (promoCode != null && !promoCode.isBlank()) {
            ZeraCoinPromo promo = promoRepository.findByPromoCodeAndIsActiveTrue(promoCode)
                    .orElseThrow(() -> new RuntimeException("Invalid or expired Zera Coin promo code!"));

            int coinCost = promo.getCoinValue();

            // This invokes your deduct method, instantly wiping out your IntelliJ warning!
            user.deductZeraCoins(coinCost);
        }

        // 6. Inventory Deduction
        variant.setStockQuantity(variant.getStockQuantity() - quantity);

        // 7. LOYALTY CREDIT LOOP: Reward customer with 10% back in Zera Coins for the purchase
        int coinsEarned = totalAmount.intValue() / 10;
        user.addZeraCoins(coinsEarned);

        // 8. Commit changes straight to Neon PostgreSQL cloud instance
        variantRepository.save(variant);
        userRepository.save(user);
    }
}