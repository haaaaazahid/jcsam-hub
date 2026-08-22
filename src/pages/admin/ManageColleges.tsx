import CrudTable from "@/components/CrudTable";
import { ImageUploader } from "@/components/ImageUploader";
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem } from "@/hooks/useAppData";

const ManageGallery = () => {
  const { data: gallery = [], isLoading } = useGallery();
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
        { key: "url", label: "Image", render: (g) => g.url ? <img src={g.url} alt="" className="w-16 h-10 object-cover rounded" /> : "—" },
        { key: "caption", label: "Caption" },
        { key: "category", label: "Category" },
        { key: "date", label: "Date" },
      ]}
      fields={[
        { key: "caption", label: "Caption / Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text", required: true },
        { key: "date", label: "Date", type: "date", required: true },
        {
          key: "url",
          label: "Image",
          type: "custom",
          renderCustom: (value, onChange) => (
            <ImageUploader bucket="gallery" currentUrl={value} onUpload={onChange} onRemove={() => onChange("")} label="Upload Photo" />
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
