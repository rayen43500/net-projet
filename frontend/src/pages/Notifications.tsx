import ModulePage from "./ModulePage";

const Notifications = () => (
  <ModulePage
    title="Notifications"
    description="Alertes systeme et temps reel."
    actions={["Nouvelle notification", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une notification"
    columns={["Message", "Type", "Date", "Lu"]}
    rows={[["Nouveau devis", "System", "2026-05-29", "Non"]]}
  />
);

export default Notifications;
