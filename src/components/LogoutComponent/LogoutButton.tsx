"use client";

//import { useAppDispatch } from "@/redux/hooks";
//import { removeAuth } from "@/redux/features/auth/auth";
import { Button } from "@/components/ui/button"; // adjust if using a different button
import { removeAuth } from "@/redux/features/auth/auth";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(removeAuth());
    await fetch("/api/auth-data", {
      method: "DELETE",
    });
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
