import ModulePage from "./ModulePage";

const AuditLogs = () => (
  <ModulePage
    title="Journal d audit"
    description="Historique des actions et modifications."
    apiEndpoint="/audit-logs"
    readOnly
    searchPlaceholder="Rechercher un log"
    columns={[
      { key: "actorId", label: "Utilisateur" },
      { key: "action", label: "Action" },
      { key: "entityName", label: "Module" },
      { key: "entityId", label: "Element" },
      { key: "details", label: "Details" },
      { key: "createdAtUtc", label: "Date", type: "datetime" }
    ]}
    fields={[]}
  />
);

export default AuditLogs;
