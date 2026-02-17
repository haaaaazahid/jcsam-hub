import CrudTable from "@/components/CrudTable";
import { useData } from "@/context/DataContext";
import type { GalleryImage } from "@/data/dummyData";

const ManageGallery = () => {
  const { gallery, setGallery, sports } = useData();
  return (
    <CrudTable<GalleryImage>
      title="Manage Gallery"
      data={gallery}
      searchKey="caption"
      columns={[
        { key: "url", label: "Image", render: (g) => <img src={g.url} alt={g.caption} className="w-16 h-12 object-cover rounded" /> },
        { key: "caption", label: "Caption" },
        { key: "sportId", label: "Sport", render: (g) => sports.find(s => s.id === g.sportId)?.name || "" },
        { key: "date", label: "Date" },
      ]}
      fields={[
        { key: "url", label: "Image URL", type: "text", required: true },
        { key: "caption", label: "Caption", type: "text", required: true },
        { key: "sportId", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "date", label: "Date", type: "date", required: true },
      ]}
      onAdd={(item) => setGallery(prev => [...prev, { ...item, id: Date.now().toString() } as GalleryImage])}
      onEdit={(item) => setGallery(prev => prev.map(g => g.id === item.id ? item : g))}
      onDelete={(id) => setGallery(prev => prev.filter(g => g.id !== id))}
    />
  );
};

export default ManageGallery;
