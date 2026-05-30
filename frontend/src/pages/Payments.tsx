import ModulePage from "./ModulePage";

const Payments = () => (
  <ModulePage
    title="Paiements"
    description="Historique des paiements par facture."
    actions={["Nouveau paiement", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un paiement"
    columns={["Facture", "Montant", "Methode", "Date", "Actions"]}
    rows={[["INV-2026-01", "12000", "Bank", "2026-05-30", "Voir"]]}
  />
);

export default Payments;
