import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { Notice } from "@/data/dummyData";

const ManageNotices = () => {
  const { notices, setNotices, sports } = useData();
  return (
    <CrudTable<Notice>
      title="Manage Notices"
      data={notices}
      searchKey="title"
      columns={[
        { key: "title", label: "Title" },
        { key: "priority", label: "Priority", render: (n) => (
          <span className={n.priority === "urgent" ? "priority-urgent" : n.priority === "important" ? "priority-important" : "priority-normal"}>{n.priority}</span>
        )},
        { key: "sportId", label: "Sport", render: (n) => n.sportId ? sports.find(s => s.id === n.sportId)?.name : "General" },
        { key: "date", label: "Date" },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "content", label: "Content", type: "textarea", required: true },
        { key: "sportId", label: "Sport (leave empty for General)", type: "select", options: [{ value: "", label: "General" }, ...sports.map(s => ({ value: s.id, label: s.name }))] },
        { key: "priority", label: "Priority", type: "select", options: [{ value: "normal", label: "Normal" }, { value: "important", label: "Important" }, { value: "urgent", label: "Urgent" }], required: true },
        { key: "date", label: "Date", type: "date", required: true },
      ]}
      onAdd={(item) => setNotices(prev => [...prev, { ...item, id: Date.now().toString(), image: "", pdfUrl: "", sportId: (item as any).sportId || null } as Notice])}
      onEdit={(item) => setNotices(prev => prev.map(n => n.id === item.id ? item : n))}
      onDelete={(id) => setNotices(prev => prev.filter(n => n.id !== id))}
    />
  );
};

export default ManageNotices;
