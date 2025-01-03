package com.fms.main.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Cylinder {

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "cylinder_type", nullable = false)
    private CylinderType type;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "status", nullable = false)
    private CylinderStatus status;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "refill_date", nullable = false)
    private LocalDateTime refillDate;

    public Cylinder() {
        this.id = generateAlphanumericId();
        this.createdDate = LocalDateTime.now();
        this.refillDate = LocalDateTime.now();
    }

    public Cylinder(CylinderType type, CylinderStatus status) {
        this();
        this.type = type;
        this.status = status;
    }

    private String generateAlphanumericId() {
        return "CYL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    // Getter and Setter for type
    public CylinderType getType() {
        return type;
    }

    public void setType(CylinderType type) {
        this.type = type;
    }

    // Getter and Setter for status
    public CylinderStatus getStatus() {
        return status;
    }

    public void setStatus(CylinderStatus status) {
        this.status = status;
    }

    // Getter and Setter for refillDate
    public LocalDateTime getRefillDate() {
        return refillDate;
    }

    public void setRefillDate(LocalDateTime refillDate) {
        this.refillDate = refillDate;
    }

    // Getter and Setter for createdDate
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Automatically set the current date/time before persisting
    @PrePersist
    public void onCreate() {
        this.createdDate = LocalDateTime.now();
        this.refillDate = LocalDateTime.now();
    }

    // Automatically update refillDate when the cylinder is updated
    @PreUpdate
    public void onUpdate() {
        this.refillDate = LocalDateTime.now();
    }
}
