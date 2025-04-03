import { OpportunitiesService } from './opportunities.service';
import { FilterOpportunityDto } from './dto/filter-opportunity.dto';
export declare class OpportunitiesController {
    private readonly opportunitiesService;
    constructor(opportunitiesService: OpportunitiesService);
    findAll(filterDto: FilterOpportunityDto): Promise<{
        data: {
            id: number;
            type: string;
            code: string;
            title: string;
            is_followed: boolean;
            publish_date: Date;
            close_date: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findFollowed(filterDto: FilterOpportunityDto): Promise<{
        data: {
            id: number;
            type: string;
            code: string;
            title: string;
            is_followed: boolean;
            publish_date: Date;
            close_date: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    toggleFollow(code: string): Promise<{
        id: number;
        type: string;
        code: string;
        title: string;
        is_followed: boolean;
        publish_date: Date;
        close_date: Date;
    }>;
}
