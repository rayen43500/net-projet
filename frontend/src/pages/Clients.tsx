import ModulePage from "./ModulePage";

const Clients = () => (
  <ModulePage
    title="Gestion des clients"
    description="Contacts, societes et historique des projets."
    actions={["Nouveau client", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un client"
    columns={["Nom", "Email", "Telephone", "Societe", "Actions"]}
    rows={[
      ["Alpha Corp", "contact@alpha.com", "+212 600 111 222", "Alpha Corp", "Voir"]
    ]}
  />
);

export default Clients;
