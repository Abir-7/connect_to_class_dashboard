"use client";

import { useAppDispatch } from "@/redux/hooks";
import { removeAuth } from "@/redux/features/auth/auth";
import { Button } from "@/components/ui/button"; // adjust if using a different button
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    // 1. Clear Redux state

    // 2. Clear cookie
    await fetch("/api/auth-data", {
      method: "DELETE",
    });
    dispatch(removeAuth());
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="flex w-full items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
