import CrudTable from "@/components/CrudTable";
import { useColleges, useCreateCollege, useUpdateCollege, useDeleteCollege } from "@/hooks/useSupabaseData";
import { FiDownload } from "react-icons/fi";

function downloadCSV(data: any[], filename: string) {
  if (!data.length) return;
  const keys = ["name", "address", "contact_person", "email", "phone", "status", "registration_date"];
  const header = keys.join(",");
  const rows = data.map(row => keys.map(k => `"${String(row[k] ?? "").replace(/"/g, '""')}"`).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const ManageColleges = () => {
  const { data: colleges = [], isLoading } = useColleges();
  const createCollege = useCreateCollege();
  const updateCollege = useUpdateCollege();
  const deleteCollege = useDeleteCollege();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => downloadCSV(colleges, "colleges.csv")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-colors"
        >
          <FiDownload className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <CrudTable
        title="Manage Colleges"
        data={colleges}
        loading={isLoading}
        searchKey="name"
        columns={[
          { key: "name", label: "Name" },
          { key: "contact_person", label: "Contact Person" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone", render: (c) => c.phone ? `+91 ${c.phone.replace(/^\+91\s?/, "")}` : "" },
          { key: "status", label: "Status", render: (c) => (
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{c.status}</span>
          )},
        ]}
        fields={[
          { key: "name", label: "College Name", type: "text", required: true },
          { key: "address", label: "Address", type: "textarea", required: true },
          { key: "contact_person", label: "Contact Person", type: "text", required: true },
          { key: "email", label: "Email", type: "text", required: true },
          { key: "phone", label: "Phone (10 digits)", type: "text", required: true },
          { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }], required: true },
          { key: "registration_date", label: "Registration Date", type: "date" },
        ]}
        onAdd={(item) => createCollege.mutate(item as any)}
        onEdit={(item) => updateCollege.mutate(item as any)}
        onDelete={(id) => deleteCollege.mutate(id)}
      />
    </div>
  );
};

export default ManageColleges;
