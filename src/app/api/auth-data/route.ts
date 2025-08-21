import { TUserRoles } from "@/interface/authinterface";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type AuthCookie = {
  token: string;
  email: string;
  role: TUserRoles;
  id: string;
};

export async function GET(): Promise<NextResponse<AuthCookie | null>> {
  const cookie = (await cookies()).get("auth")?.value;

  if (!cookie) return NextResponse.json(null, { status: 200 });

  try {
    const parsed: AuthCookie = JSON.parse(cookie);
    return NextResponse.json(parsed, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}

export async function DELETE(): Promise<NextResponse> {
  const cookieStore = await cookies();

  cookieStore.set("auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return NextResponse.json({ message: "Auth cookie removed" }, { status: 200 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: AuthCookie = await req.json();
  console.log(body);
  const authPayload = JSON.stringify(body);

  const cookieStore = await cookies();

  cookieStore.set("auth", authPayload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return NextResponse.json({ message: "Auth cookie saved" }, { status: 200 });
}
