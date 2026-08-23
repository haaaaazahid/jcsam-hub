import CrudTable from "@/components/CrudTable";
import { ImageUploader } from "@/components/ImageUploader";
import {
  useColleges,
  useCreateCollege,
  useUpdateCollege,
  useDeleteCollege,
} from "@/hooks/useAppData";
import type { College } from "@/types/entities";

// ============================================================
// MANAGE COLLEGES
//
// This route previously rendered a duplicate copy of
// ManageGallery.tsx (a copy/paste mistake) - /admin/colleges
// never actually let admins manage colleges. This is the real
// College CRUD page, matching the fields colleges actually
// submit on the public Registration page (name, address,
// contact_person, email, phone, status) plus an optional logo.
// ============================================================

const ManageColleges = () => {
  const { data: colleges = [] as College[], isLoading } = useColleges();
  const createCollege = useCreateCollege();
  const updateCollege = useUpdateCollege();
  const deleteCollege = useDeleteCollege();

  return (
    <CrudTable<College>
      title="Manage Colleges"
      data={colleges}
      loading={isLoading}
      searchKey="name"
      columns={[
        {
          key: "logo_url",
          label: "Logo",
          render: (c) =>
            c.logo_url || c.logoUrl ? (
              <img
                src={c.logo_url || c.logoUrl}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                {c.name?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            ),
        },
        { key: "name", label: "College Name" },
        { key: "contact_person", label: "Contact Person" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        {
          key: "status",
          label: "Status",
          render: (c) => (
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                c.status === "active"
                  ? "bg-success/10 text-success"
                  : c.status === "pending"
                  ? "bg-amber-500/10 text-amber-600"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {c.status || "active"}
            </span>
          ),
        },
      ]}
      fields={[
        { key: "name", label: "College Name", type: "text", required: true },
        { key: "address", label: "Address", type: "textarea" },
        {
          key: "contact_person",
          label: "Contact Person",
          type: "text",
          required: true,
        },
        { key: "email", label: "Email", type: "text", required: true },
        { key: "phone", label: "Phone (10 digits)", type: "text", required: true },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "rejected", label: "Rejected" },
          ],
          required: true,
        },
        {
          key: "logo_url",
          label: "College Logo",
          type: "custom",
          renderCustom: (value, onChange) => (
            <ImageUploader
              bucket="college-logos"
              currentUrl={value}
              onUpload={onChange}
              onRemove={() => onChange("")}
              label="Upload Logo"
            />
          ),
        },
      ]}
      onAdd={(item) => createCollege.mutate({ ...item, status: item.status || "active" } as any)}
      onEdit={(item) => updateCollege.mutate(item as any)}
      onDelete={(id) => deleteCollege.mutate(id)}
    />
  );
};

export default ManageColleges;
