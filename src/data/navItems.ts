export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Availability", path: "/availability" },
  { label: "Locations", path: "/locations" },
  { label: "FAQ", path: "/faq" },
];