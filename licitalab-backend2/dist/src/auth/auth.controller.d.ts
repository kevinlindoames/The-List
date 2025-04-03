import { PrismaService } from '../prisma/prisma.service';
export declare class AuthController {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
    register(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            created_at: Date;
            updated_at: Date;
        };
    }>;
}
