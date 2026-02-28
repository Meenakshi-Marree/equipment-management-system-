package com.example.equipment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.equipment.repository.*;
import com.example.equipment.entity.*;
import com.example.equipment.exception.BusinessException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentTypeRepository equipmentTypeRepository;

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment createEquipment(Equipment equipment) {
        validateStatusRule(equipment);
        return equipmentRepository.save(equipment);
    }

    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {
        Equipment existing = equipmentRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Equipment not found"));

        existing.setName(updatedEquipment.getName());
        existing.setType(updatedEquipment.getType());
        existing.setStatus(updatedEquipment.getStatus());
        existing.setLastCleanedDate(updatedEquipment.getLastCleanedDate());

        validateStatusRule(existing);

        return equipmentRepository.save(existing);
    }

    public void deleteEquipment(Long id) {
        if (!equipmentRepository.existsById(id)) {
            throw new BusinessException("Equipment not found");
        }
        equipmentRepository.deleteById(id);
    }

    private void validateStatusRule(Equipment equipment) {
        if ("Active".equalsIgnoreCase(equipment.getStatus())
                && equipment.getLastCleanedDate() != null) {

            if (equipment.getLastCleanedDate()
                    .isBefore(LocalDate.now().minusDays(30))) {

                throw new BusinessException(
                        "Equipment cannot be Active if last cleaned date is older than 30 days"
                );
            }
        }
    }
}