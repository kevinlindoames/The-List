import "./globals.css";
import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle"; // Añade esta importación
import AuthProvider from "@/providers/AuthProvider";
import { UserNav } from "@/components/UserNav";

export const metadata: Metadata = {
  title: "LicitaLAB - Gestión de Oportunidades",
  description:
    "Plataforma para la gestión y seguimiento de oportunidades de licitación",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ReduxProvider>
              <div className="min-h-screen flex flex-col">
                <header className="bg-primary text-primary-foreground shadow-md">
                  <div className="container mx-auto py-4 px-4">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold">LicitaLAB</h1>
                      <div className="flex items-center gap-4">
                        <p className="text-sm hidden md:block">
                          Plataforma de Gestión de Oportunidades
                        </p>
                        <UserNav />
                        <ThemeToggle /> {/* Añade el componente aquí */}
                      </div>
                    </div>
                  </div>
                </header>
                <div className="flex-grow">{children}</div>
                <footer className="bg-muted py-4 mt-8">
                  <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} LicitaLAB - Todos los
                    derechos reservados
                  </div>
                </footer>
              </div>
            </ReduxProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
