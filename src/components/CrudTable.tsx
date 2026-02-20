
import { useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiEdit2, FiTrash2, FiSearch, FiLoader } from "react-icons/fi";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "date" | "time" | "custom";
  options?: { value: string; label: string }[];
  required?: boolean;
  min?: string;
  renderCustom?: (value: any, onChange: (v: any) => void) => React.ReactNode;
}

interface CrudTableProps<T extends { id: string }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  fields: Field[];
  onAdd: (item: Omit<T, "id">) => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  searchKey?: string;
  loading?: boolean;
  extraModalContent?: (form: Record<string, any>, setForm: (f: Record<string, any>) => void, editing: T | null) => React.ReactNode;
}

function CrudTable<T extends { id: string }>({
  title, data, columns, fields, onAdd, onEdit, onDelete, searchKey, loading = false, extraModalContent
}: CrudTableProps<T>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditing(null);
    const defaults: Record<string, any> = {};
    fields.forEach(f => { defaults[f.key] = f.type === "number" ? 0 : ""; });
    setForm(defaults);
    setModalOpen(true);
  };

  const openEdit = (item: T) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      onEdit({ ...form, id: editing.id } as T);
    } else {
      onAdd(form as Omit<T, "id">);
    }
    setModalOpen(false);
  };

  const filtered = searchKey
    ? data.filter(item => String((item as any)[searchKey]).toLowerCase().includes(search.toLowerCase()))
    : data;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {searchKey && (
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-sm w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          <button onClick={openAdd} className="btn-secondary text-sm !py-2 !px-4 flex items-center gap-2 whitespace-nowrap">
            <FiPlus /> Add New
          </button>
        </div>
      </div>

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <FiLoader className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {columns.map(col => (
                  <th key={col.key} className="text-left px-4 py-3 font-semibold text-muted-foreground">{col.label}</th>
                ))}
                <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(item) : String((item as any)[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-accent text-primary transition-colors">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirm(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">No records found.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setModalOpen(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold">{editing ? "Edit" : "Add"} {title.replace("Manage ", "")}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-lg hover:bg-muted"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
                  {field.type === "custom" && field.renderCustom ? (
                    field.renderCustom(form[field.key], (v) => setForm({ ...form, [field.key]: v }))
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={form[field.key] || ""}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.required}
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={form[field.key] || ""}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.required}
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select...</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key] || ""}
                      min={field.min}
                      onChange={e => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                      required={field.required}
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  )}
                </div>
              ))}
              {extraModalContent && extraModalContent(form, setForm, editing)}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 text-sm">{editing ? "Update" : "Create"}</button>
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-xl shadow-2xl p-6 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-display font-bold mb-2">Confirm Delete</h3>
            <p className="text-sm text-muted-foreground mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CrudTable;
