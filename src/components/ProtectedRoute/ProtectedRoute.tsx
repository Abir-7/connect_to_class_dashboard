"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addAuthData } from "@/redux/features/auth/auth";
import LoadingScreen from "../loadingScreen/LoadingScreen";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("/api/auth-data", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "gg");
        if (!data?.id) {
          router.replace("/login");
          return;
        }

        if (!user) {
          dispatch(
            addAuthData({
              isLoading: false,
              user: {
                id: data.id,
                token: data.token,
                role: data.role,
                email: data.email,
              },
              userProfile: null,
            })
          );
        }
      } catch (error) {
        console.error("🔒 Authentication check failed:", error);
        router.replace("/login");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyUser();
  }, [dispatch, router, user]);

  if (isCheckingAuth) {
    return <LoadingScreen></LoadingScreen>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
