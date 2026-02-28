import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function MaintenanceDialog({ open, onOpenChange, equipment, onRefresh }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: { maintenanceDate: "", notes: "", performedBy: "" },
  });

  const fetchLogs = async () => {
    if (!equipment) return;
    const res = await api.get(`/equipment/${equipment.id}/maintenance`);
    setLogs(res.data);
  };

  useEffect(() => {
    if (open && equipment) {
      fetchLogs();
      form.reset({ maintenanceDate: "", notes: "", performedBy: "" });
      setError("");
    }
  }, [open, equipment]);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await api.post("/maintenance", { ...data, equipmentId: equipment.id });
      form.reset({ maintenanceDate: "", notes: "", performedBy: "" });
      fetchLogs();
      onRefresh();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Maintenance — {equipment?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Log new maintenance */}
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3 border rounded-md p-4 bg-gray-50">
              <p className="font-semibold text-sm">Log New Maintenance</p>

              <FormField
                control={form.control}
                name="maintenanceDate"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performedBy"
                rules={{ required: "Performed by is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Performed By</FormLabel>
                    <FormControl><Input placeholder="Technician name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl><Input placeholder="Optional notes" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" size="sm">Add Log</Button>
            </form>
          </Form>

          {/* History */}
          <div>
            <p className="font-semibold text-sm mb-2">Maintenance History</p>
            {logs.length === 0 ? (
              <p className="text-gray-400 text-sm">No maintenance logs yet.</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="border rounded-md p-3 text-sm bg-white">
                    <p className="font-medium">{log.maintenanceDate} — {log.performedBy}</p>
                    {log.notes && <p className="text-gray-500">{log.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}