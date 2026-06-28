import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Ponto Cego Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const adminUser = process.env.ADMIN_USER || "diego";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return new NextResponse("ADMIN_PASSWORD não configurada.", {
      status: 500,
    });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return unauthorized();
  }

  const [scheme, encoded] = authorization.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return unauthorized();
  }

  const decoded = atob(encoded);
  const [user, password] = decoded.split(":");

  if (user !== adminUser || password !== adminPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};