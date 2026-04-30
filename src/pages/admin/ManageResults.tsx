import CrudTable from "@/components/CrudTable";
import { useResults, useCreateResult, useUpdateResult, useDeleteResult, useSchedules } from "@/hooks/useSupabaseData";

const ManageResults = () => {
  const { data: results = [], isLoading } = useResults();
  const { data: schedules = [] } = useSchedules();
  const createResult = useCreateResult();
  const updateResult = useUpdateResult();
  const deleteResult = useDeleteResult();

  return (
    <CrudTable
      title="Manage Results"
      data={results}
      loading={isLoading}
      searchKey="winner"
      columns={[
        {
          key: "schedule_id", label: "Match", render: (r) => {
            const s = (r as any).schedules || schedules.find((s: any) => s.id === r.schedule_id);
            return s ? `${s.title} — ${s.date || ""}` : "—";
          }
        },
        { key: "winner", label: "Winner" },
        { key: "score", label: "Score" },
      ]}
      fields={[
        {
          key: "schedule_id",
          label: "Match",
          type: "select",
          options: schedules.map((s: any) => ({
            value: s.id,
            label: s.title ? `${s.title} — ${s.date || ""}` : s.id
          })),
          required: true
        },
        { key: "winner", label: "Winner", type: "text", required: true },
        { key: "score", label: "Score", type: "text", required: true },
        { key: "summary", label: "Summary", type: "textarea", required: false },
      ]}
      onAdd={(item) => createResult.mutate(item as any)}
      onEdit={(item) => updateResult.mutate(item as any)}
      onDelete={(id) => deleteResult.mutate(id)}
    />
  );
};

export default ManageResults;