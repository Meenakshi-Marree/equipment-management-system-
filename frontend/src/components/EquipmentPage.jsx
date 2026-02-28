import { useState, useEffect } from "react";
import api from "../lib/api";
import EquipmentTable from "./EquipmentTable";
import EquipmentFormDialog from "./EquipmentFormDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function EquipmentPage() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [types, setTypes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

 const fetchEquipment = async () => {
  const res = await api.get("/equipment");
  const data = Array.isArray(res.data) ? res.data : res.data.content || [];
  setEquipmentList(data);
};

  const fetchTypes = async () => {
    const res = await api.get("/types");
    setTypes(res.data);
  };

  useEffect(() => {
    fetchEquipment();
    fetchTypes();
  }, []);

  const handleAdd = () => {
    setEditingEquipment(null);
    setError("");
    setDialogOpen(true);
  };

  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
    setError("");
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this equipment?")) return;
    await api.delete(`/equipment/${id}`);
    fetchEquipment();
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        type: { id: Number(data.typeId) },
        status: data.status,
        lastCleanedDate: data.lastCleanedDate,
      };
      if (editingEquipment) {
        await api.put(`/equipment/${editingEquipment.id}`, payload);
      } else {
        await api.post("/equipment", payload);
      }
      setDialogOpen(false);
      fetchEquipment();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  // Filter + Search
  const filteredList = equipmentList
    .filter(e => statusFilter === "all" || e.status === statusFilter)
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const activeCount = equipmentList.filter(e => e.status === "Active").length;
  const inactiveCount = equipmentList.filter(e => e.status === "Inactive").length;
  const maintenanceCount = equipmentList.filter(e => e.status === "Under Maintenance").length;

  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Equipment</p>
          <p className="text-2xl font-bold text-gray-900">{equipmentList.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{activeCount}</p>
        </div>
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
        </div>
        <div className="bg-white rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Under Maintenance</p>
          <p className="text-2xl font-bold text-red-500">{maintenanceCount}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search equipment..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-64"
          />
          <Select onValueChange={v => { setStatusFilter(v); setCurrentPage(1); }} value={statusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAdd}>+ Add Equipment</Button>
      </div>

      {/* Table */}
      <EquipmentTable
        equipmentList={paginatedList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={fetchEquipment}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      <EquipmentFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        equipment={editingEquipment}
        types={types}
        error={error}
      />
    </div>
  );
}