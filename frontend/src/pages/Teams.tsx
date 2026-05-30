import ModulePage from "./ModulePage";

const Teams = () => (
  <ModulePage
    title="Equipes"
    description="Organisation et responsables."
    apiEndpoint="/teams"
    createLabel="Nouvelle equipe"
    searchPlaceholder="Rechercher une equipe"
    columns={[
      { key: "name", label: "Nom" },
      { key: "leadId", label: "Responsable" },
      { key: "memberIds", label: "Membres", type: "tags" }
    ]}
    fields={[
      { key: "name", label: "Nom", required: true },
      { key: "leadId", label: "Responsable ID" },
      { key: "memberIds", label: "Membres IDs", type: "tags", helperText: "Separez les IDs par des virgules." }
    ]}
  />
);

export default Teams;
