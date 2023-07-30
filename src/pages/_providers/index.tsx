import { parseCookies } from "nookies";
import { useNavigate } from "react-router-dom";

interface PageProviderProps {
  children: React.ReactNode;
}
export function PageProviders({ children }: PageProviderProps) {
  const { "Dashboard.UserToken": Token } = parseCookies();
  const router = useNavigate();

  if (!Token) {
    return <>{router("/")}</>;
  }

  return <>{children}</>;
}
