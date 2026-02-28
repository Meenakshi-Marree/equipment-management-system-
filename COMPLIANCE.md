# Compliance Checklist

## UI Compliance

### No Inline Styles
✅ No `style={{}}` inline styles were used anywhere in the frontend.
All styling is done using Tailwind CSS utility classes only.

### No Raw HTML Form Elements
✅ No raw `<input>`, `<select>`, or `<button>` HTML elements were used.
All form elements use shadcn/ui components:
- `<Input>` from shadcn/ui
- `<Select>`, `<SelectTrigger>`, `<SelectContent>`, `<SelectItem>` from shadcn/ui
- `<Button>` from shadcn/ui

### Shared Form Component
✅ `EquipmentFormDialog.jsx` is reused for both Add and Edit operations.
- Add mode: opened with `equipment={null}`
- Edit mode: opened with `equipment={existingEquipment}`
- The form title and submit button label change dynamically based on mode.

### Equipment Types Not Hardcoded
✅ Equipment types are stored in the `equipment_types` table in PostgreSQL.
✅ Types are fetched dynamically via `GET /api/types` endpoint.
✅ The dropdown in the form is populated from the database at runtime.
✅ New types can be added directly to the database without any code changes.

### Business Rules Enforced in Backend

#### 30-Day Status Constraint
✅ Enforced in `EquipmentService.java`:
- If status is set to "Active" and last cleaned date is older than 30 days,
  the backend throws a `BusinessException` with a meaningful message.
- Frontend displays this error message in the form.

#### Maintenance Auto-Update
✅ Enforced in `MaintenanceService.java`:
- When a maintenance log is added, equipment status is automatically set to "Active"
- Equipment's `lastCleanedDate` is automatically updated to the maintenance date
- Both updates happen in the same transaction.