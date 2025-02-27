import { NextRequest, NextResponse } from "next/server";
import { print } from "graphql";
import { CHECK_AUTH_QUERY } from "./lib/graphql/actions/me.action";
import { isEmpty } from "lodash";
export async function middleware(req: NextRequest) {
  try {
    const response = await fetch(`http://localhost:3001/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("Cookie") || "",
      },
      body: JSON.stringify({
        query: print(CHECK_AUTH_QUERY),
      }),
    });

    const { data } = await response.json();

    console.log(data);

    const isAuthenticated = !isEmpty(data);

    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    if (!isAuthenticated && !isAuthPage) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    if (isAuthenticated && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/", "/auth/:path*"], // Áp dụng middleware cho các route
};
