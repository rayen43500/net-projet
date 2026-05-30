import ModulePage from "./ModulePage";

const Services = () => (
  <ModulePage
    title="Catalogue des services"
    description="Offres, descriptions et tarifs."
    apiEndpoint="/services"
    createLabel="Nouveau service"
    searchPlaceholder="Rechercher un service"
    columns={[
      { key: "name", label: "Nom" },
      { key: "category", label: "Categorie" },
      { key: "estimatedPrice", label: "Prix estime", type: "money" },
      { key: "estimatedDays", label: "Jours" },
      { key: "imageUrls", label: "Image", type: "image", render: (value) => {
        const image = Array.isArray(value) ? value[0] : value;
        return image ? <img src={String(image)} alt="" style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 6 }} /> : "-";
      } }
    ]}
    fields={[
      { key: "name", label: "Nom", required: true },
      { key: "category", label: "Categorie" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "estimatedPrice", label: "Prix estime", type: "number" },
      { key: "estimatedDays", label: "Delai estime (jours)", type: "number" },
      { key: "imageUrls", label: "Image du service", type: "image-list" }
    ]}
  />
);

export default Services;
