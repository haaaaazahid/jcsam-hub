import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { Player } from "@/data/dummyData";

const ManagePlayers = () => {
  const { players, setPlayers, colleges, sports } = useData();
  return (
    <CrudTable<Player>
      title="Manage Players"
      data={players}
      searchKey="name"
      columns={[
        { key: "name", label: "Name" },
        { key: "collegeId", label: "College", render: (p) => colleges.find(c => c.id === p.collegeId)?.name || p.collegeId },
        { key: "sportId", label: "Sport", render: (p) => sports.find(s => s.id === p.sportId)?.name || p.sportId },
        { key: "age", label: "Age" },
        { key: "status", label: "Status", render: (p) => (
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${p.status === "approved" ? "bg-success/10 text-success" : p.status === "pending" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{p.status}</span>
        )},
      ]}
      fields={[
        { key: "name", label: "Player Name", type: "text", required: true },
        { key: "collegeId", label: "College", type: "select", options: colleges.map(c => ({ value: c.id, label: c.name })), required: true },
        { key: "sportId", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "age", label: "Age", type: "number", required: true },
        { key: "contact", label: "Contact", type: "text", required: true },
        { key: "status", label: "Status", type: "select", options: [{ value: "pending", label: "Pending" }, { value: "approved", label: "Approved" }, { value: "rejected", label: "Rejected" }], required: true },
      ]}
      onAdd={(item) => setPlayers(prev => [...prev, { ...item, id: Date.now().toString(), idDocument: "" } as Player])}
      onEdit={(item) => setPlayers(prev => prev.map(p => p.id === item.id ? item : p))}
      onDelete={(id) => setPlayers(prev => prev.filter(p => p.id !== id))}
    />
  );
};

export default ManagePlayers;
