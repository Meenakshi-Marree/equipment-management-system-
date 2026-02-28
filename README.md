
# Equipment Management System

A web application to manage equipment and their maintenance lifecycle.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Spring Boot (Java 17), Spring Data JPA
- **Database**: PostgreSQL

## Project Structure
```
equipment-management-system/
├── backend/
├── frontend/
├── db/
├── README.md
└── COMPLIANCE.md
```

## Prerequisites
- Java 17
- Node.js 18+
- PostgreSQL 16
- Maven

## Database Setup
1. Install PostgreSQL and open pgAdmin
2. Create a new database named `equipment_db`
3. Open Query Tool and run the contents of `/db/init.sql`
4. Then run this to seed equipment types:
```sql
INSERT INTO equipment_types (name) VALUES
('HVAC'), ('Electrical'), ('Plumbing'), ('Mechanical'), ('Safety');
```

## Backend Setup
1. Navigate to `/backend`
2. Open `src/main/resources/application.properties`
3. Update your PostgreSQL password:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/equipment_db
spring.datasource.username=postgres
spring.datasource.password=Marree@890
spring.jpa.hibernate.ddl-auto=validate
server.port=8082
```
4. Run the backend:
```bash
**mvn spring-boot:run** 

Backend runs on **http://localhost:8082**

## Frontend Setup
1. Navigate to `/frontend`
2. Install dependencies:
```bash
npm install
```
3. Run the frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

## Additional Libraries Used
### Frontend
- `axios` - HTTP client: **npm install axios**
- `react-hook-form` - Form management: **npm install react-hook-form**
- `tailwindcss-animate` - Animations: **npm install tailwindcss-animate**
- `shadcn/ui` - UI components: **npx shadcn@latest init**

### Backend
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- PostgreSQL Driver
- Lombok
- Spring Boot Starter Validation

## API Endpoints
### Equipment
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/{id}` - Update equipment
- `DELETE /api/equipment/{id}` - Delete equipment

### Maintenance
- `POST /api/maintenance` - Add maintenance log
- `GET /api/equipment/{id}/maintenance` - Get maintenance history

### Types
- `GET /api/types` - Get all equipment types

## Assumptions
- Equipment types are seeded via SQL and manageable directly in the database
- Port 8082 is used for backend to avoid conflicts
- Frontend proxies API calls to backend at localhost:8082
