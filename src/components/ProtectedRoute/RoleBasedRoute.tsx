"use client";
import { TUserRoles } from "@/interface/authinterface";
import { useAppSelector } from "@/redux/hooks";
import React, { ReactNode } from "react";

interface RoleBasedRouteProps {
  children: ReactNode;
  roles: TUserRoles[]; // expected roles allowed for this route
}

const RoleBasedRoute = ({ children, roles }: RoleBasedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  // Redirect or null if not authorized
  if (!user || !roles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Unauthorized access
      </div>
    );
    // OR: router.replace("/unauthorized"); return null;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
