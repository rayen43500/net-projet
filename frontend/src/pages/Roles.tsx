import ModulePage from "./ModulePage";

const Roles = () => (
  <ModulePage
    title="Roles"
    description="Gestion des roles et permissions."
    apiEndpoint="/roles"
    createLabel="Nouveau role"
    searchPlaceholder="Rechercher un role"
    columns={[
      { key: "name", label: "Nom du role" },
      { key: "permissions", label: "Permissions", type: "tags" }
    ]}
    fields={[
      { key: "name", label: "Nom du role", required: true },
      { key: "permissions", label: "Permissions", type: "tags", helperText: "Exemple: Projects.Read, Projects.Write" }
    ]}
  />
);

export default Roles;
