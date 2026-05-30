import ModulePage from "./ModulePage";

const Payments = () => (
  <ModulePage
    title="Paiements"
    description="Historique des paiements par facture."
    apiEndpoint="/payments"
    createLabel="Nouveau paiement"
    searchPlaceholder="Rechercher un paiement"
    columns={[
      { key: "invoiceId", label: "Facture" },
      { key: "clientId", label: "Client" },
      { key: "amount", label: "Montant", type: "money" },
      { key: "method", label: "Methode" },
      { key: "paidOn", label: "Date", type: "date" },
      { key: "status", label: "Statut" }
    ]}
    fields={[
      { key: "invoiceId", label: "Facture ID" },
      { key: "clientId", label: "Client ID" },
      { key: "amount", label: "Montant", type: "number" },
      { key: "method", label: "Methode", type: "select", defaultValue: "Bank", options: ["Bank", "Card", "Cash", "Wallet"] },
      { key: "paidOn", label: "Date paiement", type: "date" },
      { key: "status", label: "Statut", type: "select", defaultValue: "Pending", options: ["Pending", "Paid", "Failed"] }
    ]}
  />
);

export default Payments;
