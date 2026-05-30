import ModulePage from "./ModulePage";

const Teams = () => (
  <ModulePage
    title="Equipes"
    description="Organisation et responsables."
    actions={["Nouvelle equipe", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une equipe"
    columns={["Nom", "Responsable", "Membres", "Actions"]}
    rows={[["Team Alpha", "Sami", "6", "Voir"]]}
  />
);

export default Teams;
