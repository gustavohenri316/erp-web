import { createContext, useState, useEffect, useContext } from "react";
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
import { toast } from "react-hot-toast";
import { getUserPrivileges } from "../pages/settings-privileges/settings-privileges.service";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [countNotifications, setCountNotifications] = useState("");
  const [userPrivilege, setUserPrivilege] = useState([]);
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

  async function gePrivileges(id: string) {
    try {
      const response = await getUserPrivileges({ id });
      const keysArray = response.map((item: any) => item.key);
      setUserPrivilege(keysArray);

      setCookie(undefined, "Dashboard.UserToken-permissions", keysArray, {
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (error) {
      console.error("Error fetching user privileges:", error);
    }
  }

  useEffect(() => {
    if (Token) {
      fetchUser();
      findNotifications(Token);
      gePrivileges(Token);
    }
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInType) {
    try {
      const { token, user } = await sigInRequest({ email, password });
      setCookie(undefined, "Dashboard.UserToken", token, {
        maxAge: 60 * 60 * 24 * 30,
      });

      setCookie(undefined, "Dashboard.UserToken-permissions", user.privileges, {
        maxAge: 60 * 60 * 24 * 30,
      });

      setUser(user);
      window.location.href = "/";
    } catch (err) {
      toast.error("Email ou senha invalido");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        findNotifications,
        gePrivileges,
        countNotifications,
        userPrivilege,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
