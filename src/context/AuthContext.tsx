import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sigInRequest } from "../service/sigin.service";
import { getUserProfile } from "../service/user.service";
import {
  AuthContextType,
  AuthProviderType,
  SignInType,
  UserProfile,
} from "./context";
import { parseCookies, setCookie } from "nookies";
import { getNotificationsUnRead } from "../pages/notifications-view/notifications-view.service";

export const AuthContext = createContext({} as AuthContextType);
export function AuthProvider({ children }: AuthProviderType) {
  const router = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [countNotifications, setCountNotifications] = useState("");
  const { "Dashboard.UserToken": Token } = parseCookies();

  async function fetchUser(): Promise<void> {
    const response: any = await getUserProfile({ Token });
    setUser(response);
  }

  async function findNotifications(id: string) {
    const response = await getNotificationsUnRead(id);
    setCookie(
      undefined,
      "Dashboard.UserToken-notifications-unread-count",
      response.count,
      {
        maxAge: 60 * 60 * 24 * 30,
      }
    );
    setCountNotifications(String(response.count));
  }

  useEffect(() => {
    if (Token) {
      fetchUser();
      findNotifications(Token);
    }
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInType) {
    const { token, user } = await sigInRequest({ email, password });
    setCookie(undefined, "Dashboard.UserToken", token, {
      maxAge: 60 * 60 * 24 * 30,
    });

    setCookie(undefined, "Dashboard.UserToken-permissions", user.privileges, {
      maxAge: 60 * 60 * 24 * 30,
    });
    setUser(user);
    router("/home");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        findNotifications,
        countNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
