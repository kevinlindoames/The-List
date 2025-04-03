"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function UserNav() {
  const { data: session, status } = useSession();

  // Si el usuario no está autenticado, mostrar botón de inicio de sesión
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button variant="outline" size="sm">
            Iniciar sesión
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm">Registrarse</Button>
        </Link>
      </div>
    );
  }

  // Mientras se carga, mostrar un placeholder
  if (status === "loading") {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "Avatar"}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-8 w-8" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Administración</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
