import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthDataFromCookie } from "./serverAction/auth.server";

// Publicly accessible paths (no auth or role check)
const publicPaths = ["/login", "/signup", "/verify"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths through without auth check
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const auth = await getAuthDataFromCookie();
  const token = auth?.token;
  const role = auth?.role;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${role.toLowerCase()}`, request.url)
    );
  }

  return NextResponse.next();
}

// Apply middleware to all routes except next/static/api assets
export const config = {
  matcher: [
    // Match all paths except:
    // - API routes
    // - Static files
    // - Next.js internals
    // - Favicon
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
