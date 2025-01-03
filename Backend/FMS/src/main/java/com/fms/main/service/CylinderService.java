package com.fms.main.service;

import com.fms.main.model.Cylinder;
import com.fms.main.repository.CylinderRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CylinderService {

    private final CylinderRepository cylinderRepository;

    public CylinderService(CylinderRepository cylinderRepository) {
        this.cylinderRepository = cylinderRepository;
    }

    // Get all cylinders
    public List<Cylinder> getAllCylinders() {
        return cylinderRepository.findAll();
    }

    // Add a new cylinder
    public Cylinder addCylinder(Cylinder cylinder) {
        // Ensure that the type and status are valid, and handle accordingly
        if (cylinder.getType() == null || cylinder.getStatus() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cylinder type or status cannot be null");
        }
        return cylinderRepository.save(cylinder);
    }

    // Get a cylinder by ID
    public Optional<Cylinder> getCylinderById(String id) {
        return cylinderRepository.findById(id);
    }

    // Update an existing cylinder
    public Cylinder updateCylinder(String id, Cylinder updatedCylinder) {
        return cylinderRepository.findById(id)
                .map(existingCylinder -> {
                    // Update the cylinder details
                    existingCylinder.setType(updatedCylinder.getType());
                    existingCylinder.setStatus(updatedCylinder.getStatus());
                    existingCylinder.setRefillDate(updatedCylinder.getRefillDate());
                    return cylinderRepository.save(existingCylinder);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cylinder not found"));
    }

    // Delete a cylinder
    public void deleteCylinder(String id) {
        if (!cylinderRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cylinder not found");
        }
        cylinderRepository.deleteById(id);
    }
}
