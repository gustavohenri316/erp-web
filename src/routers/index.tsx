import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Spinner } from "../components/Spinner";
import { parseCookies } from "nookies";

const Lazy = (routerLink: string) =>
  // @vite-ignore
  lazy(() => import(routerLink));

const LayoutDashboard = Lazy("../layout");
const ForgotStep1 = Lazy("../pages/forgot/step-one/[slug]");
const ForgotStep2 = Lazy("../pages/forgot/step-two/[slug]");
const ForgotStep3 = Lazy("../pages/forgot/step-tree/[slug]");
const HomePage = Lazy("../pages/home");
const NotificationsRegister = Lazy("../pages/notifications-register");
const NotificationsView = Lazy("../pages/notifications-view");
const ProductsView = Lazy("../pages/products-view");
const ProductsRegister = Lazy("../pages/products-register");
const Permissions = Lazy("../pages/settings-permission");
const PermissionRegister = Lazy("../pages/settings-permission-register");
const Privileges = Lazy("../pages/settings-privileges");
const PrivilegesRegister = Lazy("../pages/settings-privileges-register");
const PrivilegesUpdate = Lazy("../pages/settings-privileges-update/[slug]");
const UserRegister = Lazy("../pages/user-register");
const UserUpdate = Lazy("../pages/user-update/[slug]");
const UserViewDetails = Lazy("../pages/user-view-details/[slug]");
const Users = Lazy("../pages/users-view");
const SignIn = Lazy("../pages/signIn");
const Customers = Lazy("../pages/customers-view");
const CustomersUpdate = Lazy("../pages/customers-update");
const CustomersRegister = Lazy("../pages/customers-register");
const Teams = Lazy("../pages/teams-view");
const TeamsRegister = Lazy("../pages/teams-register");
const Polls = Lazy("../pages/polls-view");
const PollsRegister = Lazy("../pages/polls-register");
const Feedbacks = Lazy("../pages/feedbacks");
const NotFound = Lazy("../pages/not-found");
const ProfileUpdate = Lazy("../pages/profile-update/[slug]");

export function Routers() {
  const { "Dashboard.UserToken": Token } = parseCookies();

  if (!Token) {
    return (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgot/step-one/:id" element={<ForgotStep1 />} />
          <Route path="/forgot/step-two/:id" element={<ForgotStep2 />} />
          <Route path="/forgot/step-tree/:id" element={<ForgotStep3 />} />
          <Route path="/feedbacks-view" element={<Feedbacks />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-green-600 dark:bg-green-900">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<LayoutDashboard />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/notifications-register"
            element={<NotificationsRegister />}
          />
          <Route path="/notifications-view" element={<NotificationsView />} />
          <Route path="/settings-permission" element={<Permissions />} />
          <Route
            path="/settings-permission-register"
            element={<PermissionRegister />}
          />
          <Route path="/settings-privileges" element={<Privileges />} />
          <Route
            path="/settings-privileges-register"
            element={<PrivilegesRegister />}
          />
          <Route
            path="/settings-privileges-update/:id"
            element={<PrivilegesUpdate />}
          />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/user-update/:id" element={<UserUpdate />} />
          <Route path="/user-view-details/:id" element={<UserViewDetails />} />
          <Route path="/users-view" element={<Users />} />
          <Route path="/customers-view" element={<Customers />} />
          <Route path="/customers-register" element={<CustomersRegister />} />
          <Route path="/customers-update/:id" element={<CustomersUpdate />} />
          <Route path="/teams-view" element={<Teams />} />
          <Route path="/teams-register" element={<TeamsRegister />} />
          <Route path="/polls-view" element={<Polls />} />
          <Route path="/polls-register" element={<PollsRegister />} />
          <Route path="/profile/:id" element={<ProfileUpdate />} />
          <Route path="/products-view" element={<ProductsView />} />
          <Route path="/products-register" element={<ProductsRegister />} />
        </Route>
        <Route path="/feedbacks-view" element={<Feedbacks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
