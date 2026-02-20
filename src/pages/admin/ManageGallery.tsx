
import CrudTable from "@/components/CrudTable";
import { ImageUploader } from "@/components/ImageUploader";
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem, useSports } from "@/hooks/useSupabaseData";

const ManageGallery = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const { data: sports = [] } = useSports();
  const createItem = useCreateGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  return (
    <CrudTable
      title="Manage Gallery"
      data={gallery}
      loading={isLoading}
      searchKey="caption"
      columns={[
        { key: "url", label: "Image", render: (g) => <img src={g.url} alt={g.caption} className="w-16 h-12 object-cover rounded" /> },
        { key: "caption", label: "Caption" },
        { key: "sport_id", label: "Sport", render: (g) => (g as any).sports?.name || sports.find(s => s.id === g.sport_id)?.name || "" },
        { key: "date", label: "Date" },
      ]}
      fields={[
        { key: "caption", label: "Caption", type: "text", required: true },
        { key: "sport_id", label: "Sport", type: "select", options: sports.map(s => ({ value: s.id, label: s.name })), required: true },
        { key: "date", label: "Date", type: "date", required: true },
        {
          key: "url",
          label: "Gallery Image",
          type: "custom",
          renderCustom: (value, onChange) => (
            <ImageUploader
              bucket="gallery-images"
              currentUrl={value}
              onUpload={onChange}
              onRemove={() => onChange("")}
              label="Upload Gallery Image"
            />
          ),
        },
      ]}
      onAdd={(item) => createItem.mutate(item as any)}
      onEdit={(item) => updateItem.mutate(item as any)}
      onDelete={(id) => deleteItem.mutate(id)}
    />
  );
};

export default ManageGallery;
