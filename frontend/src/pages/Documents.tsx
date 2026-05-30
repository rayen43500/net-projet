import ModulePage from "./ModulePage";

const Documents = () => (
  <ModulePage
    title="Documents"
    description="Stockage, versioning et telechargement."
    actions={["Nouveau document", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un document"
    columns={["Nom", "Type", "Taille", "Date", "Actions"]}
    rows={[["Contrat.pdf", "Contrat", "120 KB", "2026-05-20", "Telecharger"]]}
  />
);

export default Documents;
