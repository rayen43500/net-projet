import ModulePage from "./ModulePage";

const Tasks = () => (
  <ModulePage
    title="Gestion des taches"
    description="Suivi, priorites et statut de progression."
    apiEndpoint="/tasks"
    createLabel="Nouvelle tache"
    searchPlaceholder="Rechercher une tache"
    columns={[
      { key: "title", label: "Titre" },
      { key: "projectId", label: "Projet" },
      { key: "assigneeId", label: "Responsable" },
      { key: "priority", label: "Priorite" },
      { key: "status", label: "Statut" },
      { key: "progress", label: "Progression" },
      { key: "dueDate", label: "Echeance", type: "date" }
    ]}
    fields={[
      { key: "title", label: "Titre", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "projectId", label: "Projet ID" },
      { key: "assigneeId", label: "Responsable ID" },
      { key: "priority", label: "Priorite", type: "select", defaultValue: "Medium", options: ["Low", "Medium", "High", "Urgent"] },
      { key: "status", label: "Statut", type: "select", defaultValue: "To Do", options: ["To Do", "In Progress", "In Review", "Done"] },
      { key: "progress", label: "Progression", type: "number" },
      { key: "dueDate", label: "Echeance", type: "date" }
    ]}
  />
);

export default Tasks;
