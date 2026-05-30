import ModulePage from "./ModulePage";

const Tickets = () => (
  <ModulePage
    title="Support"
    description="Suivi des tickets clients et priorites."
    apiEndpoint="/tickets"
    createLabel="Nouveau ticket"
    searchPlaceholder="Rechercher un ticket"
    columns={[
      { key: "subject", label: "Sujet" },
      { key: "clientId", label: "Client" },
      { key: "projectId", label: "Projet" },
      { key: "priority", label: "Priorite" },
      { key: "status", label: "Statut" }
    ]}
    fields={[
      { key: "subject", label: "Sujet", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "clientId", label: "Client", remoteEndpoint: "/clients", remoteLabelKey: "name" },
      { key: "projectId", label: "Projet", remoteEndpoint: "/projects", remoteLabelKey: "name" },
      { key: "priority", label: "Priorite", type: "select", defaultValue: "Normal", options: ["Low", "Normal", "High", "Urgent"] },
      { key: "status", label: "Statut", type: "select", defaultValue: "Ouvert", options: ["Ouvert", "En cours", "Resolu", "Ferme"] }
    ]}
  />
);

export default Tickets;
