import HeaderWithDrawer from "../components/Header/HeaderWithDrawer";
import { useState } from "react";
import { logoutThunk } from "../store/auth/auth.thunk.js";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../store/auth/auth.selector.js";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();

  const [auth, setAuth] = useState(useSelector(selectIsLoggedIn));

  const employeePaths = {
    home: "/employee/my-profile",
    profile: "/employee/my-profile",
    visaStatus: "/employee/visa-status",
    housing: "/employee/housing-detail",
  };
  const hrPaths = {
    home: "/hr/dashboard",
    visaStatus: "/hr/visa-status",
    housing: "/hr/housing-management",
    hiring: "/hr/hiring-management",
    profile: "/hr/employee-management",
  };

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <HeaderWithDrawer
      auth={auth}
      employeePaths={employeePaths}
      hrPaths={hrPaths}
      handleLogout={handleLogout}
    >
      {children}
    </HeaderWithDrawer>
  );
}
