import ModulePage from "./ModulePage";

const Projects = () => (
  <ModulePage
    title="Gestion des projets"
    description="Suivi des projets, statuts, budget et planning."
    actions={["Nouveau projet", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un projet"
    columns={["Nom", "Client", "Statut", "Date debut", "Date fin", "Actions"]}
    rows={[["Site vitrine", "Alpha Corp", "Active", "2026-05-01", "2026-06-15", "Voir"]]}
  />
);

export default Projects;
