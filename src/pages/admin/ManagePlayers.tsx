import CrudTable from "@/components/CrudTable";
import { usePlayers, useCreatePlayer, useUpdatePlayer, useDeletePlayer, useColleges, useSports } from "@/hooks/useSupabaseData";
import { FiDownload } from "react-icons/fi";

function downloadCSV(data: any[], colleges: any[], sports: any[], filename: string) {
  if (!data.length) return;
  const header = "Name,College,Sport,Age,Contact,Status";
  const rows = data.map(p => {
    const college = (p as any).colleges?.name || colleges.find((c: any) => c.id === p.college_id)?.name || "";
    const sport = (p as any).sports?.name || sports.find((s: any) => s.id === p.sport_id)?.name || "";
    return `"${p.name}","${college}","${sport}",${p.age},"+91 ${String(p.contact).replace(/^\+91\s?/, "")}","${p.status}"`;
  });
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const ManagePlayers = () => {
  const { data: players = [], isLoading } = usePlayers();
  const { data: colleges = [] } = useColleges();
  const { data: sports = [] } = useSports();
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();

  // Only show approved players
  const approvedPlayers = players.filter((p: any) => p.status === "approved");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => downloadCSV(approvedPlayers, colleges, sports, "players.csv")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-sm font-medium transition-colors"
        >
          <FiDownload className="w-4 h-4" /> Export CSV
        </button>
      </div>
      <CrudTable
        title="Manage Players"
        data={approvedPlayers}
        loading={isLoading}
        searchKey="name"
        columns={[
          { key: "name", label: "Name" },
          { key: "college_id", label: "College", render: (p: any) => (p as any).colleges?.name || colleges.find((c: any) => c.id === p.college_id)?.name || "" },
          { key: "sport_id", label: "Sport", render: (p: any) => (p as any).sports?.name || sports.find((s: any) => s.id === p.sport_id)?.name || "" },
          { key: "age", label: "Age" },
          { key: "contact", label: "Contact", render: (p) => p.contact ? `+91 ${String(p.contact).replace(/^\+91\s?/, "")}` : "" },
          {
            key: "status", label: "Status", render: (p) => (
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-success/10 text-success">approved</span>
            )
          },
        ]}
        fields={[
          { key: "name", label: "Player Name", type: "text", required: true },
          { key: "college_id", label: "College", type: "select", options: colleges.filter((c: any) => c.status === "active").map((c: any) => ({ value: c.id, label: c.name })), required: true },
          { key: "sport_id", label: "Sport", type: "select", options: sports.map((s: any) => ({ value: s.id, label: s.name })), required: true },
          { key: "age", label: "Age", type: "number", required: true },
          { key: "contact", label: "Contact (10 digits)", type: "text", required: true },
        ]}
        onAdd={(item) => createPlayer.mutate({ ...item, status: "approved" } as any)}
        onEdit={(item) => updatePlayer.mutate({ ...item, status: "approved" } as any)}
        onDelete={(id) => deletePlayer.mutate(id)}
      />
    </div>
  );
};

export default ManagePlayers;
