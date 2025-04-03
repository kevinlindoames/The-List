import { NextRequest, NextResponse } from 'next/server';
import opportunityService from '@/services/opportunityService';
import { OpportunityType } from '@/types/Opportunity';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const type = (searchParams.get('type') as OpportunityType) || '';
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';

        const opportunities = await opportunityService.getFollowedOpportunities({
            type,
            startDate,
            endDate
        });

        return NextResponse.json(opportunities);
    } catch (error) {
        console.error('Error fetching followed opportunities:', error);
        return NextResponse.json(
            { message: 'Error fetching followed opportunities' },
            { status: 500 }
        );
    }
}