package com.example.equipment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.equipment.entity.MaintenanceLog;
import java.util.List;

public interface MaintenanceRepository extends JpaRepository<MaintenanceLog, Long> {

    List<MaintenanceLog> findByEquipmentId(Long equipmentId);
}