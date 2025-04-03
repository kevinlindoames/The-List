import axios from 'axios';
import { Opportunity, OpportunityFilters, OpportunityResponse } from '@/types/Opportunity';

// Definición de la URL base usando variable de entorno o fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class OpportunityService {
    private baseUrl = `${API_URL}/opportunities`;

    async getOpportunities(filters?: OpportunityFilters): Promise<OpportunityResponse> {
        try {
            const response = await axios.get<OpportunityResponse>(this.baseUrl, {
                params: {
                    type: filters?.type || 'all',
                    startDate: filters?.startDate || '',
                    endDate: filters?.endDate || ''
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            throw error;
        }
    }

    async toggleFollow(code: string): Promise<Opportunity> {
        try {
            const response = await axios.patch<Opportunity>(`${this.baseUrl}/${code}/follow`);
            return response.data;
        } catch (error) {
            console.error('Error toggling follow:', error);
            throw error;
        }
    }

    async getFollowedOpportunities(filters?: OpportunityFilters): Promise<OpportunityResponse> {
        try {
            const response = await axios.get<OpportunityResponse>(`${this.baseUrl}/followed`, {
                params: {
                    type: filters?.type || 'all',
                    startDate: filters?.startDate || '',
                    endDate: filters?.endDate || ''
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching followed opportunities:', error);
            throw error;
        }
    }

    async getOpportunityByCode(code: string): Promise<Opportunity> {
        try {
            const response = await axios.get<Opportunity>(`${this.baseUrl}/${code}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching opportunity with code ${code}:`, error);
            throw error;
        }
    }
}

const opportunityService = new OpportunityService();
export default opportunityService;