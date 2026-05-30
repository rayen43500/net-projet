import ModulePage from "./ModulePage";

const QuoteRequests = () => (
  <ModulePage
    title="Demandes de devis"
    description="Reception et traitement des demandes clients."
    actions={["Nouvelle demande", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une demande"
    columns={["Client", "Service", "Date", "Statut", "Actions"]}
    rows={[["Alpha Corp", "Dev web", "2026-05-24", "En cours", "Voir"]]}
  />
);

export default QuoteRequests;
