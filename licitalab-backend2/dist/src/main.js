"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const express_rate_limit_1 = require("express-rate-limit");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URLS?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 200,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Servidor corriendo en: http://localhost:${port}`);
}
bootstrap().catch((error) => {
    console.error('Error iniciando la aplicación:', error);
});
//# sourceMappingURL=main.js.map