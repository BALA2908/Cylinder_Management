package com.fms.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fms.main.model.Cylinder;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CylinderRepository extends JpaRepository<Cylinder, String> { // Updated to use String as ID type

    // Find cylinders by their status (e.g., "filled", "empty", etc.)
    List<Cylinder> findByStatus(String status);

    // Find a cylinder by ID and status (to check if cylinder exists with specific status)
    Optional<Cylinder> findByIdAndStatus(String id, String status); // Updated to use String as ID type

    // Find cylinders by their type
    List<Cylinder> findByType(String type);

    // Find cylinders that were refilled within a specific date range
    List<Cylinder> findByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Count the number of cylinders in a specific status
    @Query("SELECT COUNT(c) FROM Cylinder c WHERE c.status = :status")
    long countByStatus(String status);

    // Update the status of a cylinder by its ID
    @Modifying
    @Transactional
    @Query("UPDATE Cylinder c SET c.status = :status WHERE c.id = :id")
    void updateCylinderStatus(String id, String status); // Updated to use String as ID type

    // Find cylinders refilled after a specific date
    List<Cylinder> findByRefillDateAfter(LocalDateTime date);

    // Optional: Find cylinders by type and status
    List<Cylinder> findByTypeAndStatus(String type, String status);
}
