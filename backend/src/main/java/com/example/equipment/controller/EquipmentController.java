package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.example.equipment.service.EquipmentService;
import com.example.equipment.entity.Equipment;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
@CrossOrigin
public class EquipmentController {

    private final EquipmentService equipmentService;

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentService.getAllEquipment());
    }

    @PostMapping
    public ResponseEntity<Equipment> createEquipment(
            @RequestBody Equipment equipment) {

        Equipment saved = equipmentService.createEquipment(equipment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(
            @PathVariable Long id,
            @RequestBody Equipment equipment) {

        return ResponseEntity.ok(
                equipmentService.updateEquipment(id, equipment)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {

        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }
}