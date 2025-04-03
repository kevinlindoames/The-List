export declare enum OpportunityType {
    TENDER = "tender",
    AGILE = "agile"
}
export declare class FilterOpportunityDto {
    type?: OpportunityType;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}
