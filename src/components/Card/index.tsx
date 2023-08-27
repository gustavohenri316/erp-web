import { Link } from "react-router-dom";

interface ICard {
  children: React.ReactNode;
  routerLink?: string;
}

export function Card({ children, routerLink }: ICard) {
  return (
    <Link
      to={routerLink as string}
      className="flex flex-col border rounded-md p-2 hover:shadow cursor-pointer"
    >
      {children}
    </Link>
  );
}
