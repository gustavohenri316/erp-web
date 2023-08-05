import {
  Users,
  Wrench,
  House,
  PaperPlaneTilt,
  ToggleRight,
  Crown,
  CurrencyDollarSimple,
  Storefront,
  QrCode,
  Files,
} from "phosphor-react";

export const routers = [
  {
    name: "Home",
    path: "/",
    permission: "view-page-home",
    icon: <House size={32} weight="thin" />,
  },
  {
    name: "Produtos",
    path: "/products-view",
    permission: "view-products",
    icon: <QrCode size={32} weight="thin" />,
  },
  {
    name: "Clientes",
    path: "/customers-view",
    permission: "view-products",
    icon: <Storefront size={32} weight="thin" />,
  },
  {
    name: "Pagamentos",
    path: "/payments-view",
    permission: "view-products",
    icon: <CurrencyDollarSimple size={32} weight="thin" />,
  },
  {
    name: "Notas Fiscais",
    path: "/invoices-view",
    permission: "view-products",
    icon: <Files size={32} weight="thin" />,
  },
  {
    name: "Usuários",
    path: "/users-view",
    permission: "view-users",
    icon: <Users size={32} weight="thin" />,
  },
  {
    name: "Configurações",
    path: "/settings",
    permission: "create_pemirmission_router",
    icon: <Wrench size={32} weight="thin" />,
    isOpen: true,
    open: [
      {
        name: "Privilégios do sistema",
        path: "/settings-privileges",

        icon: <Crown size={32} weight="thin" />,
      },
      {
        name: "Permissões do sistema",
        path: "/settings-permission",

        icon: <ToggleRight size={32} weight="thin" />,
      },
    ],
  },
  {
    name: "Notificações",
    path: "/notifications-view",
    permission: "view-users",
    icon: <PaperPlaneTilt size={32} weight="thin" />,
  },
];
