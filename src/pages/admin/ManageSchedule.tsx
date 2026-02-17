import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { Schedule } from "@/data/dummyData";

const ManageSchedule = () => {
  const { schedules, setSchedules, sports } = useData();
  return (
    <CrudTable<Schedule>
      title="Manage Schedule"
      data={schedules}
      searchKey="title"
      columns={[
        { key: "title", label: "Match" },
        { key: "sportId", label: "Sport", render: (s) => sports.find(sp => sp.id === s.sportId)?.name || "" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "status", label: "Status", render: (s) => (
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.status === "upcoming" ? "bg-primary/10 text-primary" : s.status === "completed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{s.status}</span>
        )},
      ]}
      fields={[
        { key: "title", label: "Match Title", type: "text", required: true },
        { key: "sportId", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "team1", label: "Team 1", type: "text", required: true },
        { key: "team2", label: "Team 2", type: "text" },
        { key: "venue", label: "Venue", type: "text", required: true },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "time", label: "Time", type: "time", required: true },
        { key: "status", label: "Status", type: "select", options: [{ value: "upcoming", label: "Upcoming" }, { value: "completed", label: "Completed" }, { value: "cancelled", label: "Cancelled" }], required: true },
      ]}
      onAdd={(item) => setSchedules(prev => [...prev, { ...item, id: Date.now().toString() } as Schedule])}
      onEdit={(item) => setSchedules(prev => prev.map(s => s.id === item.id ? item : s))}
      onDelete={(id) => setSchedules(prev => prev.filter(s => s.id !== id))}
    />
  );
};

export default ManageSchedule;
