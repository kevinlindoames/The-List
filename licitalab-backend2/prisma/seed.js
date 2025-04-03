"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.opportunity.deleteMany();
    await prisma.user.deleteMany();
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
            close_date: new Date("2025-01-20T13:00:00Z")
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
            publish_date: new Date("2025-01-20T18:00:00Z"),
            close_date: new Date("2025-01-22T18:00:00Z")
        },
        {
            code: "L1-12-25",
            title: "Construcción de parque fotovoltaico",
            type: "tender",
            is_followed: false,
            publish_date: new Date("2025-03-28T19:00:00Z"),
            close_date: new Date("2025-04-11T19:00:00Z")
        },
        {
            code: "L1-13-25",
            title: "Servicios de mantenimiento de redes",
            type: "agile",
            is_followed: true,
            publish_date: new Date("2025-03-20T20:00:00Z"),
            close_date: new Date("2025-04-17T20:00:00Z")
        },
        {
            code: "L1-14-25",
            title: "Compra de vehículos corporativos",
            type: "tender",
            is_followed: false,
            publish_date: new Date("2025-02-25T21:00:00Z"),
            close_date: new Date("2025-04-21T21:00:00Z")
        },
        {
            code: "L1-15-25",
            title: "Adquisición de equipos de impresión",
            type: "agile",
            is_followed: true,
            publish_date: new Date("2025-03-03T22:00:00Z"),
            close_date: new Date("2025-03-15T22:00:00Z")
        },
        {
            code: "L1-16-25",
            title: "Implementación de sistemas de videovigilancia",
            type: "tender",
            is_followed: false,
            publish_date: new Date("2025-03-28T23:00:00Z"),
            close_date: new Date("2025-04-11T23:00:00Z")
        },
        {
            code: "L1-17-25",
            title: "Modernización de infraestructura eléctrica",
            type: "agile",
            is_followed: true,
            publish_date: new Date("2025-03-28T07:30:00Z"),
            close_date: new Date("2025-04-11T07:30:00Z")
        },
        {
            code: "L1-18-25",
            title: "Servicios de consultoría financiera",
            type: "tender",
            is_followed: false,
            publish_date: new Date("2025-03-28T08:30:00Z"),
            close_date: new Date("2025-04-11T08:30:00Z")
        },
        {
            code: "L1-19-25",
            title: "Desarrollo de plataforma de e-learning",
            type: "agile",
            is_followed: true,
            publish_date: new Date("2025-03-07T09:30:00Z"),
            close_date: new Date("2025-03-14T09:30:00Z")
        },
        {
            code: "L1-20-25",
            title: "Mantenimiento de flota de transporte",
            type: "tender",
            is_followed: false,
            publish_date: new Date("2025-02-18T10:30:00Z"),
            close_date: new Date("2025-04-25T10:30:00Z")
        }
    ];
    await prisma.opportunity.createMany({ data: opportunities });
    const hashedPassword = await bcrypt.hash('LicitaLAB2024!', 10);
    await prisma.user.create({
        data: {
            name: 'Test User',
            email: 'test@licitalab.com',
            password: hashedPassword,
            role: 'USER'
        }
    });
    console.log('Seed completado');
}
main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=seed.js.map