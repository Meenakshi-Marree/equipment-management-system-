package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.equipment.repository.*;
import com.example.equipment.entity.*;
import com.example.equipment.exception.BusinessException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final EquipmentRepository equipmentRepository;

    public MaintenanceLog addMaintenance(MaintenanceLog maintenanceLog) {

        Long equipmentId = maintenanceLog.getEquipment().getId();

        Equipment equipment = equipmentRepository.findById(equipmentId)
                .orElseThrow(() -> new BusinessException("Equipment not found"));

        // Business Rule:
        // When maintenance added → set status Active + update lastCleanedDate
        equipment.setStatus("Active");
        equipment.setLastCleanedDate(maintenanceLog.getMaintenanceDate());

        maintenanceLog.setEquipment(equipment);

        equipmentRepository.save(equipment);

        return maintenanceRepository.save(maintenanceLog);
    }

    public List<MaintenanceLog> getMaintenanceByEquipment(Long equipmentId) {
        return maintenanceRepository.findByEquipmentId(equipmentId);
    }
}