// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        // Validación básica
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Faltan datos requeridos" },
                { status: 400 }
            );
        }

        // En desarrollo, puedes simular una respuesta exitosa
        if (process.env.NODE_ENV === "development" && email === "test@licitalab.com") {
            return NextResponse.json(
                {
                    message: "Usuario registrado exitosamente",
                    user: {
                        id: "1",
                        name,
                        email,
                        role: "USER"
                    }
                },
                { status: 201 }
            );
        }

        // Llamada al backend para registro
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            { name, email, password }
        );

        return NextResponse.json(response.data, { status: 201 });
    } catch (error: unknown) {
        console.error("Error en registro:", error);

        // Manejar errores específicos del backend
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(
                { message: error.response.data.message || "Error en el registro" },
                { status: error.response.status }
            );
        }

        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}