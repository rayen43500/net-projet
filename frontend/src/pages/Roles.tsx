import ModulePage from "./ModulePage";

const Roles = () => (
  <ModulePage
    title="Roles"
    description="Gestion des roles et permissions."
    actions={["Nouveau role", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un role"
    columns={["Nom du role", "Permissions", "Actions"]}
    rows={[["Admin", "All", "Voir"]]}
  />
);

export default Roles;
