package com.example.equipment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import com.example.equipment.repository.EquipmentTypeRepository;
import com.example.equipment.entity.EquipmentType;

import java.util.List;

@RestController
@RequestMapping("/api/types")
@RequiredArgsConstructor
@CrossOrigin
public class EquipmentTypeController {

    private final EquipmentTypeRepository equipmentTypeRepository;

    @GetMapping
    public ResponseEntity<List<EquipmentType>> getAllTypes() {
        return ResponseEntity.ok(equipmentTypeRepository.findAll());
    }
}