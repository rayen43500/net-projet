import ModulePage from "./ModulePage";

const Quotes = () => (
  <ModulePage
    title="Devis"
    description="Creation et validation des devis."
    apiEndpoint="/quotes"
    createLabel="Nouveau devis"
    searchPlaceholder="Rechercher un devis"
    columns={[
      { key: "reference", label: "Reference" },
      { key: "clientId", label: "Client" },
      { key: "subtotal", label: "Sous-total", type: "money" },
      { key: "taxRate", label: "TVA" },
      { key: "total", label: "Total", type: "money" },
      { key: "status", label: "Statut" },
      { key: "validUntil", label: "Valide jusqu'au", type: "date" }
    ]}
    fields={[
      { key: "quoteRequestId", label: "Demande de devis", remoteEndpoint: "/quote-requests", remoteLabelKey: "companyName" },
      { key: "clientId", label: "Client", remoteEndpoint: "/clients", remoteLabelKey: "name" },
      { key: "reference", label: "Reference", required: true },
      { key: "subtotal", label: "Sous-total", type: "number" },
      { key: "taxRate", label: "TVA", type: "number" },
      { key: "total", label: "Total", type: "number" },
      { key: "status", label: "Statut", type: "select", defaultValue: "Pending Approval", options: ["Pending Approval", "Approved", "Rejected"] },
      { key: "validUntil", label: "Valide jusqu'au", type: "date" }
    ]}
  />
);

export default Quotes;
