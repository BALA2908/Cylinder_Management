package com.fms.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;

import com.fms.main.model.Cylinder;
import com.fms.main.model.CylinderType;
import com.fms.main.model.CylinderStatus;
import com.fms.main.service.CylinderService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/cylinders")
@Validated
public class CylinderController {

    private final CylinderService cylinderService;

    @Autowired
    public CylinderController(CylinderService cylinderService) {
        this.cylinderService = cylinderService;
    }

    // Get all cylinders
    @GetMapping
    public ResponseEntity<List<Cylinder>> getAllCylinders() {
        return ResponseEntity.ok(cylinderService.getAllCylinders());
    }

    // Add a new cylinder
    @PostMapping
    public ResponseEntity<Cylinder> addCylinder(@Valid @RequestBody Cylinder cylinder) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cylinderService.addCylinder(cylinder));
    }

    // Get a cylinder by ID
    @GetMapping("/{id}")
    public ResponseEntity<Cylinder> getCylinderById(@PathVariable String id) {
        Cylinder cylinder = cylinderService.getCylinderById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cylinder not found"));
        return ResponseEntity.ok(cylinder);
    }


    // Update a cylinder
    @PutMapping("/{id}")
    public ResponseEntity<Cylinder> updateCylinder(@PathVariable String id, @Valid @RequestBody Cylinder updatedCylinder) {
        return ResponseEntity.ok(cylinderService.updateCylinder(id, updatedCylinder));
    }

    // Delete a cylinder
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCylinder(@PathVariable String id) {
        cylinderService.deleteCylinder(id);
        return ResponseEntity.noContent().build();
    }
}
