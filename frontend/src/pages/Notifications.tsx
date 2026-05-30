import ModulePage from "./ModulePage";

const Notifications = () => (
  <ModulePage
    title="Notifications"
    description="Alertes systeme et temps reel."
    apiEndpoint="/notifications"
    createLabel="Nouvelle notification"
    searchPlaceholder="Rechercher une notification"
    columns={[
      { key: "title", label: "Titre" },
      { key: "message", label: "Message" },
      { key: "recipientId", label: "Destinataire" },
      { key: "channel", label: "Canal" },
      { key: "isRead", label: "Lu", type: "boolean" }
    ]}
    fields={[
      { key: "title", label: "Titre", required: true },
      { key: "message", label: "Message", type: "textarea" },
      { key: "recipientId", label: "Destinataire ID" },
      { key: "channel", label: "Canal", type: "select", defaultValue: "System", options: ["System", "Email", "Chat", "SMS"] },
      { key: "isRead", label: "Lu", type: "boolean" }
    ]}
  />
);

export default Notifications;
