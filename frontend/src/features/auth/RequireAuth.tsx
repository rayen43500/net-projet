import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { canAccess, UserRole } from "./access";

type RequireAuthProps = {
  children: ReactNode;
  roles?: UserRole[];
};

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!canAccess(role, roles)) {
    return <Navigate to="/dashboard" replace state={{ reason: "forbidden" }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
