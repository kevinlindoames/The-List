import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    FilterOpportunityDto,
    OpportunityType,
} from './dto/filter-opportunity.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OpportunitiesService {
    private readonly logger = new Logger(OpportunitiesService.name);

    constructor(private prisma: PrismaService) { }

    async findAll(filterDto: FilterOpportunityDto) {
        const { type, startDate, endDate, page = 1, limit = 10 } = filterDto;
        const now = new Date();

        try {
            const where: Prisma.OpportunityWhereInput = {
                close_date: { gte: now }, // Solo oportunidades activas
                ...(type !== OpportunityType.ALL && { type }),
                ...(startDate && {
                    publish_date: {
                        gte: new Date(startDate)
                    }
                }),
                ...(endDate && {
                    publish_date: {
                        lte: new Date(endDate)
                    }
                }),
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
        } catch (error) {
            this.logger.error('Error fetching opportunities', error.stack);
            throw new InternalServerErrorException(
                'No se pudieron cargar las oportunidades',
            );
        }
    }

    async findFollowed(filterDto: FilterOpportunityDto) {
        const { type, startDate, endDate, page = 1, limit = 10 } = filterDto;
        const now = new Date();

        try {
            const where: Prisma.OpportunityWhereInput = {
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
        } catch (error) {
            this.logger.error('Error fetching followed opportunities', error.stack);
            throw new InternalServerErrorException(
                'No se pudieron cargar las oportunidades en seguimiento',
            );
        }
    }

    async toggleFollow(code: string) {
        try {
            const opportunity = await this.prisma.opportunity.findUnique({
                where: { code },
            });

            if (!opportunity) {
                throw new NotFoundException(`Oportunidad con código ${code} no encontrada`);
            }

            return this.prisma.opportunity.update({
                where: { code },
                data: { is_followed: !opportunity.is_followed },
            });
        } catch (error) {
            this.logger.error(`Error al cambiar seguimiento de ${code}`, error.stack);
            throw new InternalServerErrorException(
                'No se pudo modificar el estado de seguimiento'
            );
        }
    }

    async findByCode(code: string) {
        try {
            const opportunity = await this.prisma.opportunity.findUnique({
                where: { code },
            });

            if (!opportunity) {
                throw new NotFoundException(`Oportunidad con código ${code} no encontrada`);
            }

            return opportunity;
        } catch (error) {
            this.logger.error(`Error al buscar oportunidad con código ${code}`, error.stack);

            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new InternalServerErrorException(
                'No se pudo encontrar la oportunidad'
            );
        }
    }
}
