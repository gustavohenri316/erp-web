import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Spinner } from "../components/Spinner";
import { parseCookies } from "nookies";

const LayoutDashboard = lazy(() => import("../layout"));
const ForgotStep1 = lazy(() => import("../pages/forgot/step-one/[slug]"));
const ForgotStep2 = lazy(() => import("../pages/forgot/step-two/[slug]"));
const ForgotStep3 = lazy(() => import("../pages/forgot/step-tree/[slug]"));
const HomePage = lazy(() => import("../pages/home"));
const NotificationsRegister = lazy(
  () => import("../pages/notifications-register")
);
const NotificationsView = lazy(() => import("../pages/notifications-view"));
const ProductsView = lazy(() => import("../pages/products-view"));
const Permissions = lazy(() => import("../pages/settings-permission"));
const PermissionRegister = lazy(
  () => import("../pages/settings-permission-register")
);
const Privileges = lazy(() => import("../pages/settings-privileges"));
const PrivilegesRegister = lazy(
  () => import("../pages/settings-privileges-register")
);
const PrivilegesUpdate = lazy(
  () => import("../pages/settings-privileges-update/[slug]")
);
const UserRegister = lazy(() => import("../pages/user-register"));
const UserUpdate = lazy(() => import("../pages/user-update/[slug]"));
const UserViewDetails = lazy(() => import("../pages/user-view-details/[slug]"));
const Users = lazy(() => import("../pages/users-view"));
const SignIn = lazy(() => import("../pages/signIn"));
const Customers = lazy(() => import("../pages/customers-view"));
const CustomersRegister = lazy(() => import("../pages/customers-register"));
const Teams = lazy(() => import("../pages/teams-view"));
const TeamsRegister = lazy(() => import("../pages/teams-register"));
const Polls = lazy(() => import("../pages/polls-view"));
const PollsRegister = lazy(() => import("../pages/polls-register"));
const Feedbacks = lazy(() => import("../pages/feedbacks"));
const NotFound = lazy(() => import("../pages/not-found"));

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
        <div className="w-screen h-screen flex items-center justify-center bg-green-600 dark:bg-green-950">
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
          <Route path="/products-view" element={<ProductsView />} />
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
          <Route path="/teams-view" element={<Teams />} />
          <Route path="/teams-register" element={<TeamsRegister />} />
          <Route path="/polls-view" element={<Polls />} />
          <Route path="/polls-register" element={<PollsRegister />} />
        </Route>
        <Route path="/feedbacks-view" element={<Feedbacks />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
