
import CrudTable from "@/components/CrudTable";
import { useSchedules, useCreateSchedule, useUpdateSchedule, useDeleteSchedule, useSports } from "@/hooks/useSupabaseData";

const today = new Date().toISOString().split("T")[0];

const ManageSchedule = () => {
  const { data: schedules = [], isLoading } = useSchedules();
  const { data: sports = [] } = useSports();
  const createSchedule = useCreateSchedule();
  const updateSchedule = useUpdateSchedule();
  const deleteSchedule = useDeleteSchedule();

  return (
    <CrudTable
      title="Manage Schedule"
      data={schedules}
      loading={isLoading}
      searchKey="title"
      columns={[
        { key: "title", label: "Match" },
        { key: "sport_id", label: "Sport", render: (s) => (s as any).sports ? `${(s as any).sports.icon} ${(s as any).sports.name}` : sports.find(sp => sp.id === s.sport_id)?.name || "" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "status", label: "Status", render: (s) => (
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.status === "upcoming" ? "bg-primary/10 text-primary" : s.status === "completed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
            {s.status}
          </span>
        )},
      ]}
      fields={[
        { key: "title", label: "Match Title", type: "text", required: true },
        { key: "sport_id", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "team1", label: "Team 1", type: "text", required: true },
        { key: "team2", label: "Team 2", type: "text" },
        { key: "venue", label: "Venue", type: "text", required: true },
        { key: "date", label: "Date (Future only)", type: "date", required: true, min: today },
        { key: "time", label: "Time", type: "time", required: true },
        { key: "status", label: "Status", type: "select", options: [{ value: "upcoming", label: "Upcoming" }, { value: "completed", label: "Completed" }, { value: "cancelled", label: "Cancelled" }], required: true },
      ]}
      onAdd={(item) => createSchedule.mutate(item as any)}
      onEdit={(item) => updateSchedule.mutate(item as any)}
      onDelete={(id) => deleteSchedule.mutate(id)}
    />
  );
};

export default ManageSchedule;
