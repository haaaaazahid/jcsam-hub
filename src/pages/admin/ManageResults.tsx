import CrudTable from "@/components/CrudTable";
import { useResults, useCreateResult, useUpdateResult, useDeleteResult, useSchedules, useSports } from "@/hooks/useSupabaseData";

const ManageResults = () => {
  const { data: results = [], isLoading } = useResults();
  const { data: schedules = [] } = useSchedules();
  const { data: sports = [] } = useSports();
  const createResult = useCreateResult();
  const updateResult = useUpdateResult();
  const deleteResult = useDeleteResult();

  const completedSchedules = schedules.filter((s: any) => s.status === "completed");

  return (
    <CrudTable
      title="Manage Results"
      data={results}
      loading={isLoading}
      searchKey="winner"
      columns={[
        { key: "schedule_id", label: "Match", render: (r) => (r as any).schedules?.title || schedules.find((s: any) => s.id === r.schedule_id)?.title || "" },
        { key: "sport_id", label: "Sport", render: (r) => (r as any).sports?.name || sports.find((s: any) => s.id === r.sport_id)?.name || "" },
        { key: "winner", label: "Winner" },
        { key: "score", label: "Score" },
      ]}
      fields={[
        { key: "schedule_id", label: "Match", type: "select", options: completedSchedules.map((s: any) => ({ value: s.id, label: s.title })), required: true },
        { key: "sport_id", label: "Sport", type: "select", options: sports.map((s: any) => ({ value: s.id, label: s.name })), required: true },
        { key: "winner", label: "Winner", type: "text", required: true },
        { key: "score", label: "Score", type: "text", required: true },
        { key: "summary", label: "Summary", type: "textarea", required: true },
        { key: "date", label: "Date", type: "date", required: true },
      ]}
      onAdd={(item) => createResult.mutate(item as any)}
      onEdit={(item) => updateResult.mutate(item as any)}
      onDelete={(id) => deleteResult.mutate(id)}
    />
  );
};

export default ManageResults;
