import CrudTable from "@/components/CrudTable";
import { ImageUploader } from "@/components/ImageUploader";
import { useCommittee, useCreateCommitteeMember, useUpdateCommitteeMember, useDeleteCommitteeMember } from "@/hooks/useSupabaseData";

const ManageCommittee = () => {
  const { data: committee = [], isLoading } = useCommittee();
  const createMember = useCreateCommitteeMember();
  const updateMember = useUpdateCommitteeMember();
  const deleteMember = useDeleteCommitteeMember();

  return (
    <CrudTable
      title="Manage Committee"
      data={committee}
      loading={isLoading}
      searchKey="name"
      columns={[
        { key: "image", label: "Photo", render: (m) => m.image ? <img src={m.image} alt="" className="w-10 h-10 rounded-full object-cover" /> : <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{m.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</div> },
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
        { key: "display_order", label: "Display Order", type: "number" },
        {
          key: "image",
          label: "Photo",
          type: "custom",
          renderCustom: (value, onChange) => (
            <ImageUploader
              bucket="committee-images"
              currentUrl={value}
              onUpload={onChange}
              onRemove={() => onChange("")}
              label="Upload Photo"
            />
          ),
        },
      ]}
      onAdd={(item) => createMember.mutate(item as any)}
      onEdit={(item) => updateMember.mutate(item as any)}
      onDelete={(id) => deleteMember.mutate(id)}
    />
  );
};

export default ManageCommittee;
