import ModulePage from "./ModulePage";

const Clients = () => (
  <ModulePage
    title="Gestion des clients"
    description="Contacts, societes et historique des projets."
    apiEndpoint="/clients"
    createLabel="Nouveau client"
    searchPlaceholder="Rechercher un client"
    columns={[
      { key: "name", label: "Societe" },
      { key: "contactName", label: "Contact" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Telephone" }
    ]}
    fields={[
      { key: "name", label: "Societe", required: true },
      { key: "contactName", label: "Contact" },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Telephone" }
    ]}
  />
);

export default Clients;
