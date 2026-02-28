package com.example.equipment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
}