package com.example.luxzera.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "departments")
@SQLRestriction("is_active = true")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Department name is required")
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @NotBlank
    @Column(name = "slug", nullable = false, unique = true, length = 50)
    private String slug;

    // SELF-REFERENCING RELATIONSHIP: This creates sub-departments dynamically
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Department parentDepartment;

    // Tracks child sub-departments down the tree hierarchy
    @OneToMany(mappedBy = "parentDepartment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Department> subDepartments = new ArrayList<>();

    public Department() {}

    public Department(String name, String slug, Department parentDepartment) {
        this.name = name;
        this.slug = slug;
        this.parentDepartment = parentDepartment;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public Department getParentDepartment() { return parentDepartment; }
    public void setParentDepartment(Department parentDepartment) { this.parentDepartment = parentDepartment; }
    public List<Department> getSubDepartments() { return subDepartments; }
    public void setSubDepartments(List<Department> subDepartments) { this.subDepartments = subDepartments; }
}