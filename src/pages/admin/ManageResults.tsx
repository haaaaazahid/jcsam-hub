import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { Result } from "@/data/dummyData";

const ManageResults = () => {
  const { results, setResults, schedules, sports } = useData();
  const completedSchedules = schedules.filter(s => s.status === "completed");
  return (
    <CrudTable<Result>
      title="Manage Results"
      data={results}
      searchKey="winner"
      columns={[
        { key: "scheduleId", label: "Match", render: (r) => schedules.find(s => s.id === r.scheduleId)?.title || "" },
        { key: "sportId", label: "Sport", render: (r) => sports.find(s => s.id === r.sportId)?.name || "" },
        { key: "winner", label: "Winner" },
        { key: "score", label: "Score" },
      ]}
      fields={[
        { key: "scheduleId", label: "Match", type: "select", options: completedSchedules.map(s => ({ value: s.id, label: s.title })), required: true },
        { key: "sportId", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "winner", label: "Winner", type: "text", required: true },
        { key: "score", label: "Score", type: "text", required: true },
        { key: "summary", label: "Summary", type: "textarea", required: true },
        { key: "date", label: "Date", type: "date", required: true },
      ]}
      onAdd={(item) => setResults(prev => [...prev, { ...item, id: Date.now().toString() } as Result])}
      onEdit={(item) => setResults(prev => prev.map(r => r.id === item.id ? item : r))}
      onDelete={(id) => setResults(prev => prev.filter(r => r.id !== id))}
    />
  );
};

export default ManageResults;
