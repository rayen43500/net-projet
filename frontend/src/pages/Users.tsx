import ModulePage from "./ModulePage";

const Users = () => (
  <ModulePage
    title="Utilisateurs"
    description="Gestion des comptes Admin, Manager, Developer et Client."
    apiEndpoint="/users"
    createLabel="Nouvel utilisateur"
    searchPlaceholder="Rechercher un utilisateur"
    columns={[
      { key: "fullName", label: "Nom" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
      { key: "phone", label: "Telephone" },
      { key: "avatarUrl", label: "Avatar", type: "image", render: (value) => value ? <img src={String(value)} alt="" style={{ width: 42, height: 42, objectFit: "cover", borderRadius: "50%" }} /> : "-" }
    ]}
    fields={[
      { key: "fullName", label: "Nom complet", required: true },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Telephone" },
      { key: "role", label: "Role", type: "select", defaultValue: "Client", options: ["Admin", "Manager", "Developer", "Client"] },
      { key: "teamId", label: "Equipe", remoteEndpoint: "/teams", remoteLabelKey: "name" },
      { key: "avatarUrl", label: "Avatar", type: "image" },
      { key: "password", label: "Mot de passe", type: "password", helperText: "Obligatoire a la creation, laissez vide pour conserver le mot de passe actuel." }
    ]}
  />
);

export default Users;
