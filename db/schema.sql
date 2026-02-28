-- Equipment Types (dynamic, not hardcoded)
CREATE TABLE equipment_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Equipment
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INTEGER NOT NULL REFERENCES equipment_types(id),
    status VARCHAR(20) NOT NULL CHECK (
        status IN ('Active', 'Inactive', 'Under Maintenance')
    ),
    last_cleaned_date DATE NOT NULL
);

-- Maintenance Logs
CREATE TABLE maintenance_logs (
    id SERIAL PRIMARY KEY,
    equipment_id INTEGER NOT NULL
        REFERENCES equipment(id)
        ON DELETE CASCADE,
    maintenance_date DATE NOT NULL,
    notes TEXT,
    performed_by VARCHAR(255) NOT NULL
);

-- Seed Equipment Types (modifiable in future)
INSERT INTO equipment_types (name) VALUES
('HVAC'),
('Electrical'),
('Plumbing'),
('Mechanical'),
('Safety');