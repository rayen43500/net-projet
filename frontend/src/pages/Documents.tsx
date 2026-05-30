import ModulePage from "./ModulePage";

const Documents = () => (
  <ModulePage
    title="Documents"
    description="Stockage, versioning et telechargement."
    apiEndpoint="/documents"
    createLabel="Nouveau document"
    searchPlaceholder="Rechercher un document"
    columns={[
      { key: "name", label: "Nom" },
      { key: "documentType", label: "Type" },
      { key: "projectId", label: "Projet" },
      { key: "version", label: "Version" },
      { key: "url", label: "Fichier", render: (value) => value ? <a href={String(value)} target="_blank" rel="noreferrer">Ouvrir</a> : "-" }
    ]}
    fields={[
      { key: "name", label: "Nom", required: true },
      { key: "documentType", label: "Type" },
      { key: "projectId", label: "Projet ID" },
      { key: "version", label: "Version", type: "number", defaultValue: 1 },
      { key: "url", label: "Image ou document URL", type: "image", helperText: "L'upload accepte les images; les autres fichiers peuvent etre colles en URL." }
    ]}
  />
);

export default Documents;
