import { NextRequest, NextResponse } from 'next/server';
import opportunityService from '@/services/opportunityService';

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const code = searchParams.get('code') || '';
        const opportunities = await opportunityService.toggleFollow(code);

        return NextResponse.json(opportunities);
    } catch (error) {
        console.error('Error toggling opportunities:', error);
        return NextResponse.json(
            { message: 'Error toggling opportunities' },
            { status: 500 }
        );
    }
}