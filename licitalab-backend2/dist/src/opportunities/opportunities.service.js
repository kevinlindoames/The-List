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
var OpportunitiesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunitiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OpportunitiesService = OpportunitiesService_1 = class OpportunitiesService {
    prisma;
    logger = new common_1.Logger(OpportunitiesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(filterDto) {
        const { type, startDate, endDate, page = 1, limit = 10 } = filterDto;
        const now = new Date();
        try {
            const where = {
                close_date: { gte: now },
                ...(type && { type }),
                publish_date: {
                    ...(startDate && { gte: new Date(startDate) }),
                    ...(endDate && { lte: new Date(endDate) }),
                },
            };
            const [total, opportunities] = await Promise.all([
                this.prisma.opportunity.count({ where }),
                this.prisma.opportunity.findMany({
                    where,
                    orderBy: { publish_date: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
            ]);
            return {
                data: opportunities,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error('Error fetching opportunities', error.stack);
            throw new common_1.InternalServerErrorException('No se pudieron cargar las oportunidades');
        }
    }
    async findFollowed(filterDto) {
        const { type, startDate, endDate, page = 1, limit = 10 } = filterDto;
        const now = new Date();
        try {
            const where = {
                is_followed: true,
                close_date: { gte: now },
                ...(type && { type }),
                publish_date: {
                    ...(startDate && { gte: new Date(startDate) }),
                    ...(endDate && { lte: new Date(endDate) }),
                },
            };
            const [total, opportunities] = await Promise.all([
                this.prisma.opportunity.count({ where }),
                this.prisma.opportunity.findMany({
                    where,
                    orderBy: { publish_date: 'desc' },
                    skip: (page - 1) * limit,
                    take: limit,
                }),
            ]);
            return {
                data: opportunities,
                total,
                page,
                totalPages: Math.ceil(total / limit),
            };
        }
        catch (error) {
            this.logger.error('Error fetching followed opportunities', error.stack);
            throw new common_1.InternalServerErrorException('No se pudieron cargar las oportunidades en seguimiento');
        }
    }
    async toggleFollow(code) {
        try {
            const opportunity = await this.prisma.opportunity.findUnique({
                where: { code },
            });
            if (!opportunity) {
                throw new common_1.InternalServerErrorException(`Oportunidad con código ${code} no encontrada`);
            }
            return this.prisma.opportunity.update({
                where: { code },
                data: { is_followed: !opportunity.is_followed },
            });
        }
        catch (error) {
            this.logger.error(`Error al cambiar seguimiento de ${code}`, error.stack);
            throw new common_1.InternalServerErrorException('No se pudo modificar el estado de seguimiento');
        }
    }
};
exports.OpportunitiesService = OpportunitiesService;
exports.OpportunitiesService = OpportunitiesService = OpportunitiesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OpportunitiesService);
//# sourceMappingURL=opportunities.service.js.map