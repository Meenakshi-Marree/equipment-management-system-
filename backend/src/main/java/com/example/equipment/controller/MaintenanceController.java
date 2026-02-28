package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.example.equipment.service.MaintenanceService;
import com.example.equipment.entity.MaintenanceLog;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    @PostMapping("/maintenance")
    public ResponseEntity<MaintenanceLog> addMaintenance(
            @RequestBody MaintenanceLog maintenanceLog) {

        MaintenanceLog saved =
                maintenanceService.addMaintenance(maintenanceLog);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/equipment/{id}/maintenance")
    public ResponseEntity<List<MaintenanceLog>> getMaintenanceHistory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.getMaintenanceByEquipment(id)
        );
    }
}