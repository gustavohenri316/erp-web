import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { useAuth } from "../context/AuthContext";

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
const SettingsPermissions = lazy(() => import("../pages/settings-permission"));
const SettingsPermissionRegister = lazy(
  () => import("../pages/settings-permission-register")
);
const SettingsPrivileges = lazy(() => import("../pages/settings-privileges"));
const SettingsPrivilegesRegister = lazy(
  () => import("../pages/settings-privileges-register")
);
const SettingsPrivilegesUpdate = lazy(
  () => import("../pages/settings-privileges-update/[slug]")
);
const UserRegister = lazy(() => import("../pages/user-register"));
const UserUpdate = lazy(() => import("../pages/user-update/[slug]"));
const UserViewDetails = lazy(() => import("../pages/user-view-details/[slug]"));
const Users = lazy(() => import("../pages/users-view"));
const SignIn = lazy(() => import("../pages/signIn"));

export function Routers() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgot/step-one/:id" element={<ForgotStep1 />} />
          <Route path="/forgot/step-two/:id" element={<ForgotStep2 />} />
          <Route path="/forgot/step-tree/:id" element={<ForgotStep3 />} />
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<LayoutDashboard />}>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/notifications-register"
            element={<NotificationsRegister />}
          />
          <Route path="/notifications-view" element={<NotificationsView />} />
          <Route path="/products-view" element={<ProductsView />} />
          <Route
            path="/settings-permission"
            element={<SettingsPermissions />}
          />
          <Route
            path="/settings-permission-register"
            element={<SettingsPermissionRegister />}
          />
          <Route path="/settings-privileges" element={<SettingsPrivileges />} />
          <Route
            path="/settings-privileges-register"
            element={<SettingsPrivilegesRegister />}
          />
          <Route
            path="/settings-privileges-update/:id"
            element={<SettingsPrivilegesUpdate />}
          />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/user-update/:id" element={<UserUpdate />} />
          <Route path="/user-view-details/:id" element={<UserViewDetails />} />
          <Route path="/users-view" element={<Users />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
