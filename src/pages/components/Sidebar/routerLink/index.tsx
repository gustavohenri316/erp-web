import { parseCookies } from "nookies";
import {
  Users,
  Wrench,
  House,
  PaperPlaneTilt,
  ToggleRight,
  Crown,
  Storefront,
  QrCode,
  UsersFour,
  ChartLineUp,
  User,
} from "phosphor-react";

const { "Dashboard.UserToken": Token } = parseCookies();

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
    name: "Enquetes",
    path: "/polls-view",
    permission: "49HW3N8E4IQNM9QE1J0J4O1KWVDUWF",
    icon: <ChartLineUp size={32} weight="thin" />,
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
  {
    name: "Perfil",
    path: `/profile/${Token}`,
    permission: "A8PB8LX6VF1R476N7QYY2AGSPFMZ5E",
    icon: <User size={32} weight="thin" />,
  },
];
