import ModulePage from "./ModulePage";

const Blog = () => (
  <ModulePage
    title="Blog"
    description="Gestion des articles et categories."
    actions={["Nouvel article", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un article"
    columns={["Titre", "Auteur", "Date", "Statut", "Actions"]}
    rows={[["Lancement produit", "Admin", "2026-05-15", "Publie", "Voir"]]}
  />
);

export default Blog;
