import ModulePage from "./ModulePage";

const Tickets = () => (
  <ModulePage
    title="Support"
    description="Suivi des tickets clients et priorites."
    actions={["Nouveau ticket", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un ticket"
    columns={["Sujet", "Client", "Priorite", "Statut", "Date", "Actions"]}
    rows={[["Bug login", "Alpha Corp", "Urgent", "Ouvert", "2026-05-28", "Voir"]]}
  />
);

export default Tickets;
