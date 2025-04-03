export type OpportunityType = 'tender' | 'agile' | 'all';


export interface OpportunityResponse {
    data: Opportunity[];
    total: number;
    page: number;
    totalPages: number;
}

export interface Opportunity {
    id: string;
    code: string;
    title: string;
    type: OpportunityType;
    is_followed: boolean;
    publish_date: string;
    close_date: string;
}
export interface OpportunityFilters {
    type?: OpportunityType;
    startDate?: string;
    endDate?: string;
}

export interface OpportunityState {
    items: Opportunity[];
    followed: Opportunity[];
    filters: OpportunityFilters;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    total: number;
    page: number;
    totalPages: number;

}