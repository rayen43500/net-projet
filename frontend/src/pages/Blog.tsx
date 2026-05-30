import ModulePage from "./ModulePage";

const Blog = () => (
  <ModulePage
    title="Blog"
    description="Gestion des articles et categories."
    apiEndpoint="/blog-posts"
    createLabel="Nouvel article"
    searchPlaceholder="Rechercher un article"
    columns={[
      { key: "title", label: "Titre" },
      { key: "slug", label: "Slug" },
      { key: "category", label: "Categorie" },
      { key: "isPublished", label: "Publie", type: "boolean" }
    ]}
    fields={[
      { key: "title", label: "Titre", required: true },
      { key: "slug", label: "Slug" },
      { key: "category", label: "Categorie" },
      { key: "content", label: "Contenu", type: "textarea" },
      { key: "isPublished", label: "Publie", type: "boolean" }
    ]}
  />
);

export default Blog;
