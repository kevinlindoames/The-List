import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';

export enum OpportunityType {
    TENDER = 'tender',
    AGILE = 'agile',
    ALL = 'all' // Nuevo valor para representar todos los tipos
}

export class FilterOpportunityDto {
    @IsOptional()
    @IsEnum(OpportunityType)
    type?: OpportunityType = OpportunityType.ALL; // Valor por defecto será 'all'

    @IsOptional()
    startDate?: string;

    @IsOptional()
    endDate?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;
}