import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { College } from "@/data/dummyData";

const ManageColleges = () => {
  const { colleges, setColleges } = useData();
  return (
    <CrudTable<College>
      title="Manage Colleges"
      data={colleges}
      searchKey="name"
      columns={[
        { key: "name", label: "Name" },
        { key: "contactPerson", label: "Contact Person" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status", render: (c) => (
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.status === "active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{c.status}</span>
        )},
      ]}
      fields={[
        { key: "name", label: "College Name", type: "text", required: true },
        { key: "address", label: "Address", type: "textarea", required: true },
        { key: "contactPerson", label: "Contact Person", type: "text", required: true },
        { key: "email", label: "Email", type: "text", required: true },
        { key: "phone", label: "Phone", type: "text", required: true },
        { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }], required: true },
        { key: "registrationDate", label: "Registration Date", type: "date" },
      ]}
      onAdd={(item) => setColleges(prev => [...prev, { ...item, id: Date.now().toString(), logo: "" } as College])}
      onEdit={(item) => setColleges(prev => prev.map(c => c.id === item.id ? item : c))}
      onDelete={(id) => setColleges(prev => prev.filter(c => c.id !== id))}
    />
  );
};

export default ManageColleges;
