"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addAuthData } from "@/redux/features/auth/auth";

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-2 text-gray-900">
          <svg
            className="animate-spin h-6 w-6 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
