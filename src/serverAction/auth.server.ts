"use server";

//import { AuthRole } from "@/redux/features/auth/auth";
import { cookies } from "next/headers";

// export const saveAuthDataToCookie = async (
//   token: string,
//   email: string,
//   role: AuthRole,
//   id: string
// ) => {
//   const cookieStore = await cookies();

//   const authPayload = JSON.stringify({ token, email, role, id });

//   cookieStore.set("auth", authPayload, {
//     httpOnly: true, // hides from JS access
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 60 * 24 * 60 * 60, // 60 days
//   });
// };

export const getAuthDataFromCookie = async () => {
  const authCookie = (await cookies()).get("auth")?.value;
  console.log(
    authCookie,
    "-------------------------------fffff---------------"
  );
  if (!authCookie) return undefined;

  try {
    return JSON.parse(authCookie);
  } catch (error) {
    console.error("Failed to parse auth cookie:", error);
    return undefined;
  }
};

// export const removeAuthCookie = async () => {
//   const cookieStore = await cookies();

//   cookieStore.set("auth", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     maxAge: 0, // <-- expire immediately
//   });
// };
