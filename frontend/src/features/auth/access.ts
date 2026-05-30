export type UserRole = "Admin" | "Manager" | "Developer" | "Client";

export const allRoles: UserRole[] = ["Admin", "Manager", "Developer", "Client"];

type NavigationItem = {
  label: string;
  path: string;
  roles?: UserRole[];
};

export type NavigationSection = {
  title: string;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    title: "Accueil",
    items: [
      { label: "Home", path: "/", roles: allRoles },
      { label: "Dashboard", path: "/dashboard", roles: allRoles }
    ]
  },
  {
    title: "Gestion",
    items: [
      { label: "Clients", path: "/clients", roles: ["Admin", "Manager"] },
      { label: "Projets", path: "/projects", roles: allRoles },
      { label: "Taches", path: "/tasks", roles: ["Admin", "Manager", "Developer"] },
      { label: "Equipes", path: "/teams", roles: ["Admin", "Manager"] }
    ]
  },
  {
    title: "Commercial",
    items: [
      { label: "Services", path: "/services", roles: allRoles },
      { label: "Demandes devis", path: "/quote-requests", roles: ["Admin", "Manager", "Client"] },
      { label: "Devis", path: "/quotes", roles: ["Admin", "Manager", "Client"] },
      { label: "Factures", path: "/invoices", roles: ["Admin", "Manager", "Client"] },
      { label: "Paiements", path: "/payments", roles: ["Admin", "Manager", "Client"] }
    ]
  },
  {
    title: "Contenu",
    items: [
      { label: "Documents", path: "/documents", roles: allRoles },
      { label: "Blog", path: "/blog", roles: ["Admin", "Manager"] },
      { label: "Promotions", path: "/promotions", roles: ["Admin", "Manager"] }
    ]
  },
  {
    title: "Administration",
    items: [
      { label: "Utilisateurs", path: "/users", roles: ["Admin"] },
      { label: "Roles", path: "/roles", roles: ["Admin"] },
      { label: "Notifications", path: "/notifications", roles: ["Admin", "Manager"] },
      { label: "Audit Logs", path: "/audit-logs", roles: ["Admin"] },
      { label: "Parametres", path: "/settings", roles: ["Admin", "Manager"] }
    ]
  },
  {
    title: "Communication",
    items: [{ label: "Chat", path: "/chat", roles: allRoles }]
  }
];

export const canAccess = (role: string | null, itemRoles?: UserRole[]) => {
  if (!itemRoles || itemRoles.length === 0) {
    return true;
  }

  return Boolean(role && itemRoles.includes(role as UserRole));
};
