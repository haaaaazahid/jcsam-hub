
import CrudTable from "@/components/CrudTable";
import { ImageUploader, MultiImageUploader } from "@/components/ImageUploader";
import { useSports, useCreateSport, useUpdateSport, useDeleteSport, useSportImages, useAddSportImage, useDeleteSportImage } from "@/hooks/useSupabaseData";
import { useState } from "react";

const ManageSports = () => {
  const { data: sports = [], isLoading } = useSports();
  const createSport = useCreateSport();
  const updateSport = useUpdateSport();
  const deleteSport = useDeleteSport();

  // For managing images of selected sport in a panel
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);
  const { data: sportImages = [] } = useSportImages(selectedSportId ?? undefined);
  const addImage = useAddSportImage();
  const deleteImage = useDeleteSportImage();

  return (
    <div className="space-y-6">
      <CrudTable
        title="Manage Sports"
        data={sports}
        loading={isLoading}
        searchKey="name"
        columns={[
          { key: "icon", label: "Icon" },
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "description", label: "Description", render: (s) => <span className="line-clamp-1 max-w-xs">{s.description}</span> },
          {
            key: "images", label: "Images", render: (s) => (
              <button
                onClick={() => setSelectedSportId(prev => prev === s.id ? null : s.id)}
                className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                📷 Manage Images
              </button>
            )
          },
        ]}
        fields={[
          { key: "name", label: "Name", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "icon", label: "Icon (emoji)", type: "text", required: true },
          { key: "description", label: "Description", type: "textarea", required: true },
          { key: "rules", label: "Rules", type: "textarea", required: true },
          { key: "banner_color", label: "Banner Color Class", type: "text" },
        ]}
        onAdd={(item) => createSport.mutate(item as any)}
        onEdit={(item) => updateSport.mutate(item as any)}
        onDelete={(id) => deleteSport.mutate(id)}
      />

      {/* Sport Image Manager Panel */}
      {selectedSportId && (
        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">
              📷 Images for: {sports.find(s => s.id === selectedSportId)?.name}
            </h3>
            <button onClick={() => setSelectedSportId(null)} className="text-sm text-muted-foreground hover:text-foreground">✕ Close</button>
          </div>
          <MultiImageUploader
            bucket="sport-images"
            images={sportImages.map(img => ({ id: img.id, url: img.url, caption: img.caption }))}
            onAdd={(url, caption) => addImage.mutate({ sport_id: selectedSportId, url, caption, display_order: sportImages.length })}
            onDelete={(id) => deleteImage.mutate({ id, sportId: selectedSportId })}
          />
        </div>
      )}
    </div>
  );
};

export default ManageSports;
