import {
    Controller,
    Get,
    Patch,
    Param,
    Query,
    ValidationPipe,
    // UseGuards  // Descomentar cuando implementes autenticación
} from '@nestjs/common';
import { OpportunitiesService } from './opportunities.service';
import { FilterOpportunityDto } from './dto/filter-opportunity.dto';

@Controller('/opportunities')
export class OpportunitiesController {
    constructor(private readonly opportunitiesService: OpportunitiesService) { }

    @Get()
    findAll(
        @Query(new ValidationPipe({
            transform: true,
            skipMissingProperties: true,
            forbidNonWhitelisted: true,
            whitelist: true
        }))
        filterDto: FilterOpportunityDto,
    ) {
        return this.opportunitiesService.findAll(filterDto);
    }

    @Get('followed')
    findFollowed(
        @Query(new ValidationPipe({ transform: true }))
        filterDto: FilterOpportunityDto,
    ) {
        return this.opportunitiesService.findFollowed(filterDto);
    }

    @Patch(':code/follow')
    // @UseGuards(JwtAuthGuard) // Descomentar cuando implementes autenticación
    toggleFollow(@Param('code') code: string) {
        return this.opportunitiesService.toggleFollow(code);
    }

    @Get(':code')
    findOne(@Param('code') code: string) {
        return this.opportunitiesService.findByCode(code);
    }
}
