import ModulePage from "./ModulePage";

const Quotes = () => (
  <ModulePage
    title="Devis"
    description="Creation et validation des devis."
    actions={["Nouveau devis", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un devis"
    columns={["Numero", "Client", "Montant", "Statut", "Actions"]}
    rows={[["Q-2026-01", "Alpha Corp", "12000", "Pending Approval", "Voir"]]}
  />
);

export default Quotes;
