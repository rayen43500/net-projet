import ModulePage from "./ModulePage";

const Promotions = () => (
  <ModulePage
    title="Promotions"
    description="Remises, coupons et campagnes."
    apiEndpoint="/promotions"
    createLabel="Nouvelle promo"
    searchPlaceholder="Rechercher une promotion"
    columns={[
      { key: "name", label: "Nom" },
      { key: "code", label: "Code" },
      { key: "discountPercent", label: "Reduction" },
      { key: "startsOn", label: "Debut", type: "date" },
      { key: "endsOn", label: "Fin", type: "date" },
      { key: "isActive", label: "Active", type: "boolean" }
    ]}
    fields={[
      { key: "name", label: "Nom", required: true },
      { key: "code", label: "Code" },
      { key: "discountPercent", label: "Reduction (%)", type: "number" },
      { key: "startsOn", label: "Date debut", type: "date" },
      { key: "endsOn", label: "Date fin", type: "date" },
      { key: "isActive", label: "Active", type: "boolean", defaultValue: true }
    ]}
  />
);

export default Promotions;
