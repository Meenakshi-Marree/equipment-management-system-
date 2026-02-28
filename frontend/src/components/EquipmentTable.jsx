import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import MaintenanceDialog from "./MaintenanceDialog";

const statusStyles = {
  Active: "bg-green-100 text-green-700 hover:bg-green-100",
  Inactive: "bg-gray-100 text-gray-600 hover:bg-gray-100",
  "Under Maintenance": "bg-orange-100 text-orange-700 hover:bg-orange-100",
};

function isOverdue(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
  return diffDays > 30;
}

export default function EquipmentTable({ equipmentList, onEdit, onDelete, onRefresh }) {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);

  const handleViewMaintenance = (equipment) => {
    setSelectedEquipment(equipment);
    setMaintenanceOpen(true);
  };

  return (
    <>
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Type</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Last Cleaned</TableHead>
              <TableHead className="font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16">
                  <p className="text-4xl mb-2">🔧</p>
                  <p className="text-gray-500 font-medium">No equipment found</p>
                  <p className="text-gray-300 text-sm">Try adjusting your search or filter</p>
                </TableCell>
              </TableRow>
            ) : (
              equipmentList.map((eq) => (
                <TableRow key={eq.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="font-semibold text-gray-800">{eq.name}</TableCell>
                  <TableCell className="text-gray-600">{eq.type?.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[eq.status]}`}>
                      {eq.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={isOverdue(eq.lastCleanedDate) ? "text-red-500 font-semibold" : "text-gray-700"}>
                      {eq.lastCleanedDate}
                      {isOverdue(eq.lastCleanedDate) && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                          ⚠ Overdue
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => handleViewMaintenance(eq)}
                      >
                        Maintenance
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(eq)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(eq.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MaintenanceDialog
        open={maintenanceOpen}
        onOpenChange={setMaintenanceOpen}
        equipment={selectedEquipment}
        onRefresh={onRefresh}
      />
    </>
  );
}