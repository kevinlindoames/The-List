"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        console.log('Eliminando datos existentes...');
        try {
            await prisma.opportunity.deleteMany();
        }
        catch (error) {
            console.log('No se pudo eliminar oportunidades, posiblemente la tabla no existe aún.');
        }
        try {
            await prisma.user.deleteMany();
        }
        catch (error) {
            console.log('No se pudo eliminar usuarios, posiblemente la tabla no existe aún.');
        }
        const opportunities = [
            {
                code: "L1-01-25",
                title: "Adquisición de computadores",
                type: "tender",
                is_followed: true,
                publish_date: new Date("2025-03-20T08:00:00Z"),
                close_date: new Date("2025-03-25T08:00:00Z")
            },
            {
                code: "L1-02-25",
                title: "Desarrollo de software empresarial",
                type: "agile",
                is_followed: false,
                publish_date: new Date("2025-03-25T09:00:00Z"),
                close_date: new Date("2025-04-15T09:00:00Z")
            },
            {
                code: "L1-03-25",
                title: "Suministro de mobiliario de oficina",
                type: "tender",
                is_followed: true,
                publish_date: new Date("2025-02-18T10:00:00Z"),
                close_date: new Date("2025-03-11T10:00:00Z")
            },
            {
                code: "L1-04-25",
                title: "Implementación de red de fibra óptica",
                type: "agile",
                is_followed: false,
                publish_date: new Date("2025-03-28T11:00:00Z"),
                close_date: new Date("2025-04-11T11:00:00Z")
            },
            {
                code: "L1-05-25",
                title: "Mantenimiento de equipos industriales",
                type: "tender",
                is_followed: true,
                publish_date: new Date("2025-02-01T12:00:00Z"),
                close_date: new Date("2025-03-10T12:00:00Z")
            },
            {
                code: "L1-06-25",
                title: "Construcción de edificio corporativo",
                type: "tender",
                is_followed: false,
                publish_date: new Date("2025-01-16T13:00:00Z"),
                close_date: new Date("2025-04-20T13:00:00Z")
            },
            {
                code: "L1-07-25",
                title: "Adquisición de servidores y almacenamiento",
                type: "agile",
                is_followed: true,
                publish_date: new Date("2025-03-28T14:00:00Z"),
                close_date: new Date("2025-04-11T14:00:00Z")
            },
            {
                code: "L1-08-25",
                title: "Consultoría en transformación digital",
                type: "tender",
                is_followed: false,
                publish_date: new Date("2025-03-28T15:00:00Z"),
                close_date: new Date("2025-04-11T15:00:00Z")
            },
            {
                code: "L1-09-25",
                title: "Servicios de ciberseguridad",
                type: "agile",
                is_followed: true,
                publish_date: new Date("2025-03-28T16:00:00Z"),
                close_date: new Date("2025-04-11T16:00:00Z")
            },
            {
                code: "L1-10-25",
                title: "Implementación de ERP empresarial",
                type: "tender",
                is_followed: false,
                publish_date: new Date("2025-03-28T17:00:00Z"),
                close_date: new Date("2025-04-11T17:00:00Z")
            },
            {
                code: "L1-11-25",
                title: "Renovación de licencias de software",
                type: "agile",
                is_followed: true,
                publish_date: new Date("2025-03-20T18:00:00Z"),
                close_date: new Date("2025-04-22T18:00:00Z")
            }
        ];
        console.log('Creando oportunidades...');
        await prisma.opportunity.createMany({ data: opportunities });
        console.log(`Creadas ${opportunities.length} oportunidades.`);
        console.log('Creando usuario de prueba...');
        const hashedPassword = await bcrypt.hash('LicitaLAB2024!', 10);
        await prisma.user.create({
            data: {
                name: 'Test User',
                email: 'test@licitalab.com',
                password: hashedPassword,
                role: 'USER'
            }
        });
        console.log('Usuario de prueba creado.');
        console.log('Seed completado con éxito!');
    }
    catch (error) {
        console.error('Error ejecutando seed:', error);
        throw error;
    }
}
main()
    .catch((error) => {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map