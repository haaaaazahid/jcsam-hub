import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { CommitteeMember } from "@/data/committeeData";

const ManageCommittee = () => {
  const { committee, setCommittee } = useData();
  return (
    <CrudTable<CommitteeMember>
      title="Manage Committee"
      data={committee}
      searchKey="name"
      columns={[
        { key: "name", label: "Name" },
        { key: "designation", label: "Designation" },
        { key: "role", label: "Role" },
        { key: "institution", label: "Institution" },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "designation", label: "Designation", type: "text", required: true },
        { key: "role", label: "Role", type: "text", required: true },
        { key: "institution", label: "Institution", type: "text", required: true },
      ]}
      onAdd={(item) => setCommittee(prev => [...prev, { ...item, id: Date.now().toString(), image: "" } as CommitteeMember])}
      onEdit={(item) => setCommittee(prev => prev.map(m => m.id === item.id ? item : m))}
      onDelete={(id) => setCommittee(prev => prev.filter(m => m.id !== id))}
    />
  );
};

export default ManageCommittee;
