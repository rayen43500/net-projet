import ModulePage from "./ModulePage";

const Promotions = () => (
  <ModulePage
    title="Promotions"
    description="Remises, coupons et campagnes."
    actions={["Nouvelle promo", "Exporter", "Actualiser"]}
    searchPlaceholder="Rechercher une promotion"
    columns={["Nom", "Reduction", "Date debut", "Date fin", "Statut"]}
    rows={[["Spring Sale", "15%", "2026-05-01", "2026-05-31", "Active"]]}
  />
);

export default Promotions;
