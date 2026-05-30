import ModulePage from "./ModulePage";

const Invoices = () => (
  <ModulePage
    title="Factures"
    description="Generation et suivi des factures."
    actions={["Nouvelle facture", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une facture"
    columns={["Numero", "Client", "Montant", "Echeance", "Statut", "Actions"]}
    rows={[["INV-2026-01", "Alpha Corp", "12000", "2026-06-10", "Sent", "Voir"]]}
  />
);

export default Invoices;
