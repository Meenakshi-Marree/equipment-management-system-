package com.example.equipment.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "maintenance_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate maintenanceDate;

    private String notes;

    private String performedBy;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
}