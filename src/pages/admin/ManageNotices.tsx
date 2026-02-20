
import CrudTable from "@/components/CrudTable";
import { ImageUploader } from "@/components/ImageUploader";
import { useNotices, useCreateNotice, useUpdateNotice, useDeleteNotice, useSports } from "@/hooks/useSupabaseData";

const ManageNotices = () => {
  const { data: notices = [], isLoading } = useNotices();
  const { data: sports = [] } = useSports();
  const createNotice = useCreateNotice();
  const updateNotice = useUpdateNotice();
  const deleteNotice = useDeleteNotice();

  return (
    <CrudTable
      title="Manage Notices"
      data={notices}
      loading={isLoading}
      searchKey="title"
      columns={[
        { key: "title", label: "Title" },
        { key: "priority", label: "Priority", render: (n) => (
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${n.priority === "urgent" ? "bg-destructive/10 text-destructive" : n.priority === "important" ? "bg-amber-500/10 text-amber-600" : "bg-muted text-muted-foreground"}`}>
            {n.priority}
          </span>
        )},
        { key: "sport_id", label: "Sport", render: (n) => n.sport_id ? (n as any).sports?.name || sports.find(s => s.id === n.sport_id)?.name : "General" },
        { key: "date", label: "Date" },
        { key: "image", label: "Image", render: (n) => n.image ? <img src={n.image} alt="" className="w-12 h-8 object-cover rounded" /> : <span className="text-muted-foreground text-xs">—</span> },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "content", label: "Content", type: "textarea", required: true },
        { key: "sport_id", label: "Sport (leave empty for General)", type: "select", options: [{ value: "", label: "General" }, ...sports.map(s => ({ value: s.id, label: s.name }))] },
        { key: "priority", label: "Priority", type: "select", options: [{ value: "normal", label: "Normal" }, { value: "important", label: "Important" }, { value: "urgent", label: "Urgent" }], required: true },
        { key: "date", label: "Date", type: "date", required: true },
        { key: "pdf_url", label: "PDF URL (optional)", type: "text" },
        {
          key: "image",
          label: "Notice Image",
          type: "custom",
          renderCustom: (value, onChange) => (
            <ImageUploader
              bucket="notice-images"
              currentUrl={value}
              onUpload={onChange}
              onRemove={() => onChange("")}
              label="Upload Notice Image"
            />
          ),
        },
      ]}
      onAdd={(item) => createNotice.mutate({ ...item as any, sport_id: (item as any).sport_id || null })}
      onEdit={(item) => updateNotice.mutate({ ...item as any, sport_id: (item as any).sport_id || null })}
      onDelete={(id) => deleteNotice.mutate(id)}
    />
  );
};

export default ManageNotices;
