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
  UsersFour,
} from "phosphor-react";

export const routers = [
  {
    name: "Home",
    path: "/",
    permission: "D9M76N89KR028H66IX4BA7DKS8E2K6",
    icon: <House size={32} weight="thin" />,
  },
  {
    name: "Produtos",
    path: "/products-view",
    permission: "1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE",
    icon: <QrCode size={32} weight="thin" />,
  },
  {
    name: "Clientes",
    path: "/customers-view",
    permission: "1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE",
    icon: <Storefront size={32} weight="thin" />,
  },
  {
    name: "Pagamentos",
    path: "/payments-view",
    permission: "1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE",
    icon: <CurrencyDollarSimple size={32} weight="thin" />,
  },
  {
    name: "Notas Fiscais",
    path: "/invoices-view",
    permission: "1YCCT7V2ER4MGL4L7W41E6GZQ8R6WE",
    icon: <Files size={32} weight="thin" />,
  },
  {
    name: "Usuários",
    path: "/users-view",
    permission: "AX5BSOD5G8CT1Y5I8XGVWYIFLXK6WW",
    icon: <Users size={32} weight="thin" />,
  },
  {
    name: "Configurações",
    path: "/settings",
    permission: "IMJ7ZO07T9QI57X9FB3Y1K3UHZYKQF",
    icon: <Wrench size={32} weight="thin" />,
    isOpen: true,
    open: [
      {
        name: "Privilégios",
        path: "/settings-privileges",
        icon: <Crown size={32} weight="thin" />,
        permission: "",
      },
      {
        name: "Permissões",
        path: "/settings-permission",
        icon: <ToggleRight size={32} weight="thin" />,
        permission: "IMJ7ZO07T9QI57X9FB3Y1K3UHZYKQF",
      },
      {
        name: "Equipes",
        path: "/teams-view",
        icon: <UsersFour size={32} weight="thin" />,
        permission: "S8IVPVBG70XGZ5SJUSUN7XDT0TCR38",
      },
    ],
  },
  {
    name: "Notificações",
    path: "/notifications-view",
    permission: "BYSEHZACU1K40NWP0GA3483JGY945N",
    icon: <PaperPlaneTilt size={32} weight="thin" />,
  },
];
