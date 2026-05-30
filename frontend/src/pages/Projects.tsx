import ModulePage from "./ModulePage";

const Projects = () => (
  <ModulePage
    title="Gestion des projets"
    description="Suivi des projets, statuts, budget et planning."
    apiEndpoint="/projects"
    createLabel="Nouveau projet"
    searchPlaceholder="Rechercher un projet"
    columns={[
      { key: "reference", label: "Reference" },
      { key: "name", label: "Nom" },
      { key: "clientId", label: "Client" },
      { key: "status", label: "Statut" },
      { key: "startDate", label: "Debut", type: "date" },
      { key: "endDate", label: "Fin", type: "date" },
      { key: "budget", label: "Budget", type: "money" }
    ]}
    fields={[
      { key: "reference", label: "Reference" },
      { key: "name", label: "Nom", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "clientId", label: "Client", remoteEndpoint: "/clients", remoteLabelKey: "name" },
      { key: "quoteId", label: "Devis", remoteEndpoint: "/quotes", remoteLabelKey: "reference" },
      { key: "status", label: "Statut", type: "select", defaultValue: "Draft", options: ["Draft", "Pending Approval", "Active", "On Hold", "Completed", "Cancelled"] },
      { key: "startDate", label: "Date debut", type: "date" },
      { key: "endDate", label: "Date fin", type: "date" },
      { key: "budget", label: "Budget", type: "number" }
    ]}
  />
);

export default Projects;
