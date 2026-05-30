import ModulePage from "./ModulePage";

const AuditLogs = () => (
  <ModulePage
    title="Journal d audit"
    description="Historique des actions et modifications."
    actions={["Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un log"
    columns={["Utilisateur", "Action", "Module", "Date", "Details"]}
    rows={[["admin@dsp.local", "Update", "Projects", "2026-05-29", "Status changed"]]}
  />
);

export default AuditLogs;
