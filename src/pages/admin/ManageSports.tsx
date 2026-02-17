import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { Sport } from "@/data/sportsData";

const ManageSports = () => {
  const { sports, setSports } = useData();
  return (
    <CrudTable<Sport>
      title="Manage Sports"
      data={sports}
      searchKey="name"
      columns={[
        { key: "icon", label: "Icon" },
        { key: "name", label: "Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Description", render: (s) => <span className="line-clamp-1 max-w-xs">{s.description}</span> },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "icon", label: "Icon (emoji)", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea", required: true },
        { key: "rules", label: "Rules", type: "textarea", required: true },
        { key: "bannerColor", label: "Banner Color Class", type: "text" },
      ]}
      onAdd={(item) => setSports(prev => [...prev, { ...item, id: Date.now().toString() } as Sport])}
      onEdit={(item) => setSports(prev => prev.map(s => s.id === item.id ? item : s))}
      onDelete={(id) => setSports(prev => prev.filter(s => s.id !== id))}
    />
  );
};

export default ManageSports;
