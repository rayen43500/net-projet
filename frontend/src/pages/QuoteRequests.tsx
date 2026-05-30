import ModulePage from "./ModulePage";

const QuoteRequests = () => (
  <ModulePage
    title="Demandes de devis"
    description="Reception et traitement des demandes clients."
    apiEndpoint="/quote-requests"
    createLabel="Nouvelle demande"
    searchPlaceholder="Rechercher une demande"
    columns={[
      { key: "companyName", label: "Societe" },
      { key: "contactName", label: "Contact" },
      { key: "projectType", label: "Type projet" },
      { key: "budget", label: "Budget", type: "money" },
      { key: "status", label: "Statut" }
    ]}
    fields={[
      { key: "clientId", label: "Client", remoteEndpoint: "/clients", remoteLabelKey: "name" },
      { key: "companyName", label: "Societe" },
      { key: "contactName", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Telephone" },
      { key: "projectType", label: "Type projet" },
      { key: "budget", label: "Budget", type: "number" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "attachmentUrls", label: "Image / piece jointe", type: "image-list" },
      { key: "status", label: "Statut", type: "select", defaultValue: "Draft", options: ["Draft", "Quoted", "Cancelled"] }
    ]}
  />
);

export default QuoteRequests;
