import CrudTable from "@/components/CrudTable";
import { useResults, useCreateResult, useUpdateResult, useDeleteResult } from "@/hooks/useAppData";

const ManageResults = () => {
  const { data: results = [], isLoading } = useResults();
  const createResult = useCreateResult();
  const updateResult = useUpdateResult();
  const deleteResult = useDeleteResult();

  return (
    <CrudTable
      title="Manage Results"
      data={results}
      loading={isLoading}
      searchKey="studentName"
      columns={[
        { key: "eventName", label: "Event" },
        { key: "studentName", label: "Student" },
        { key: "collegeName", label: "College" },
        { key: "medal", label: "Medal" },
        { key: "position", label: "Position" },
        { key: "score", label: "Score" },
      ]}
      fields={[
        { key: "eventName", label: "Event Name", type: "text", required: true },
        { key: "studentName", label: "Student Name", type: "text", required: true },
        { key: "collegeName", label: "College Name", type: "text", required: true },
        { key: "medal", label: "Medal", type: "select", options: [
          { value: "Gold", label: "Gold" },
          { value: "Silver", label: "Silver" },
          { value: "Bronze", label: "Bronze" },
          { value: "", label: "None" },
        ] },
        { key: "position", label: "Position", type: "text" },
        { key: "score", label: "Score", type: "text" },
      ]}
      onAdd={(item) => createResult.mutate(item as any)}
      onEdit={(item) => updateResult.mutate(item as any)}
      onDelete={(id) => deleteResult.mutate(id)}
    />
  );
};

export default ManageResults;
