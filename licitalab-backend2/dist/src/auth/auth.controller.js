"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthController = AuthController_1 = class AuthController {
    prisma;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(data) {
        try {
            this.logger.log(`Intento de inicio de sesión para: ${data.email}`);
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (!user) {
                this.logger.warn(`Usuario no encontrado: ${data.email}`);
                throw new common_1.HttpException('Credenciales inválidas', common_1.HttpStatus.UNAUTHORIZED);
            }
            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Contraseña incorrecta para: ${data.email}`);
                throw new common_1.HttpException('Credenciales inválidas', common_1.HttpStatus.UNAUTHORIZED);
            }
            const { password, ...userWithoutPassword } = user;
            this.logger.log(`Inicio de sesión exitoso para: ${data.email}`);
            return {
                success: true,
                user: userWithoutPassword,
            };
        }
        catch (error) {
            this.logger.error(`Error en login: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error en el servidor al procesar la solicitud', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async register(data) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new common_1.HttpException('El correo electrónico ya está registrado', common_1.HttpStatus.BAD_REQUEST);
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const newUser = await this.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: 'USER',
                },
            });
            const { password, ...userWithoutPassword } = newUser;
            return {
                success: true,
                message: 'Usuario registrado exitosamente',
                user: userWithoutPassword,
            };
        }
        catch (error) {
            this.logger.error(`Error en registro: ${error.message}`, error.stack);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error en el servidor al procesar la solicitud', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map