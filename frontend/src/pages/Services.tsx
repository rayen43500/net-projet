import ModulePage from "./ModulePage";

const Services = () => (
  <ModulePage
    title="Catalogue des services"
    description="Offres, descriptions et tarifs."
    actions={["Nouveau service", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher un service"
    columns={["Nom", "Description", "Prix", "Actions"]}
    rows={[["Dev web", "Sites et apps", "12000", "Voir"]]}
  />
);

export default Services;
