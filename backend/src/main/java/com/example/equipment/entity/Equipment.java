package com.example.equipment.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Equipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private EquipmentType type;

    private String status;

    private LocalDate lastCleanedDate;

    @JsonIgnore
    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<MaintenanceLog> maintenanceLogs;
}