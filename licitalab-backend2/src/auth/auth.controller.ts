import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('api/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private prisma: PrismaService) { }

    @Post('login')
    async login(@Body() data: { email: string; password: string }) {
        try {
            this.logger.log(`Intento de inicio de sesión para: ${data.email}`);

            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
            });

            if (!user) {
                this.logger.warn(`Usuario no encontrado: ${data.email}`);
                throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);

            if (!isPasswordValid) {
                this.logger.warn(`Contraseña incorrecta para: ${data.email}`);
                throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
            }

            // No incluir la contraseña en la respuesta
            const { password, ...userWithoutPassword } = user;

            this.logger.log(`Inicio de sesión exitoso para: ${data.email}`);

            return {
                success: true,
                user: userWithoutPassword,
            };
        } catch (error) {
            this.logger.error(`Error en login: ${error.message}`, error.stack);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                'Error en el servidor al procesar la solicitud',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post('register')
    async register(@Body() data: { name: string; email: string; password: string }) {
        try {
            // Verificar si el correo electrónico ya está registrado
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });

            if (existingUser) {
                throw new HttpException(
                    'El correo electrónico ya está registrado',
                    HttpStatus.BAD_REQUEST
                );
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(data.password, 10);

            // Crear usuario
            const newUser = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: 'USER',
                },
            });

            // No incluir la contraseña en la respuesta
            const { password, ...userWithoutPassword } = newUser;

            return {
                success: true,
                message: 'Usuario registrado exitosamente',
                user: userWithoutPassword,
            };
        } catch (error) {
            this.logger.error(`Error en registro: ${error.message}`, error.stack);

            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException(
                'Error en el servidor al procesar la solicitud',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}