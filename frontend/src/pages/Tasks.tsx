import ModulePage from "./ModulePage";

const Tasks = () => (
  <ModulePage
    title="Gestion des taches"
    description="Suivi, priorites et statut de progression."
    actions={["Nouvelle tache", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une tache"
    columns={["Nom", "Projet", "Responsable", "Priorite", "Statut", "Actions"]}
    rows={[["Maquette UI", "Site vitrine", "Sami", "Haute", "In Progress", "Voir"]]}
  />
);

export default Tasks;
