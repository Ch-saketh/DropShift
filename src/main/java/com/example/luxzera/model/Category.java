package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "categories", indexes = {
        @Index(name = "idx_categories_slug", columnList = "slug", unique = true)
})
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Category name is required")
    @Column(name = "name", nullable = false, length = 50)
    private String name; // e.g., "TOPS", "BOTTOMS", "WATCHES"

    @NotBlank
    @Column(name = "slug", nullable = false, unique = true, length = 50)
    private String slug; // e.g., "tops", "watches"

    @NotNull(message = "Parent department connection is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    public Category() {}

    public Category(String name, String slug, Department department) {
        this.name = name;
        this.slug = slug;
        this.department = department;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}