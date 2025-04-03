import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const isAuthenticated = !!token;

    // Rutas públicas accesibles sin autenticación
    const publicRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"];
    const isPublicRoute = publicRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Rutas de API que no necesitan autenticación
    const publicApiRoutes = ["/api/auth"];
    const isPublicApiRoute = publicApiRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Rutas que requieren ser administrador
    const adminRoutes = ["/admin"];
    const isAdminRoute = adminRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Verificar si el usuario tiene el rol de admin
    const isAdmin = token?.role === "ADMIN";

    // Si es una ruta de API pública, permitir el acceso
    if (isPublicApiRoute) {
        return NextResponse.next();
    }

    // Si el usuario no está autenticado y la ruta no es pública, redirigir al login
    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Si el usuario está autenticado e intenta acceder a una ruta pública (como login), 
    // redirigir al dashboard
    if (isAuthenticated && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Si el usuario intenta acceder a una ruta de admin sin ser admin, redirigir al dashboard
    if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas de páginas (no archivos)
         * - (?!api/auth) - Excepto la ruta api/auth (para NextAuth)
         * - (?!_next) - Excepto los archivos de sistema de Next.js
         * - (.+) - Al menos debe tener un carácter
         */
        "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
    ],
};