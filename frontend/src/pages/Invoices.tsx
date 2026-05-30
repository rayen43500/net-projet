import ModulePage from "./ModulePage";

const Invoices = () => (
  <ModulePage
    title="Factures"
    description="Generation et suivi des factures."
    apiEndpoint="/invoices"
    createLabel="Nouvelle facture"
    searchPlaceholder="Rechercher une facture"
    columns={[
      { key: "reference", label: "Reference" },
      { key: "clientId", label: "Client" },
      { key: "projectId", label: "Projet" },
      { key: "total", label: "Total", type: "money" },
      { key: "issuedOn", label: "Emission", type: "date" },
      { key: "dueOn", label: "Echeance", type: "date" },
      { key: "status", label: "Statut" }
    ]}
    fields={[
      { key: "reference", label: "Reference", required: true },
      { key: "clientId", label: "Client ID" },
      { key: "projectId", label: "Projet ID" },
      { key: "subtotal", label: "Sous-total", type: "number" },
      { key: "taxRate", label: "TVA", type: "number" },
      { key: "total", label: "Total", type: "number" },
      { key: "status", label: "Statut", type: "select", defaultValue: "Draft", options: ["Draft", "Sent", "Paid", "Overdue"] },
      { key: "issuedOn", label: "Date emission", type: "date" },
      { key: "dueOn", label: "Date echeance", type: "date" }
    ]}
  />
);

export default Invoices;
