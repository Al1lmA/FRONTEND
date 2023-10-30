import defaultImage from '../assets/default.jpg';
import { getMockServices } from '../assets/MockServices';

export interface BankService {
    bank_service_id: number;
    title: string;
    button_text: string;
    short_description: string;
    description: string;
    img: string;
    service_status: string;
    image: string;
}

export interface BankServicesResult {
    request_id: number | null;
    services_list: BankService[];
}

export const GetFilteredServices = async (titleData: string): Promise<BankServicesResult> => {
    const mockServices = getMockServices();

    try {
        
        const params = new URLSearchParams({
            title: titleData,
        });

        let url = '';

        if(titleData == null){
            url = `http://127.0.0.1:8000/services/`;
        } else{
            url = `http://127.0.0.1:8000/services/?${params}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            return {
                request_id: null,
                // @ts-ignore
                services_list: mockServices.services
            }
        }

        const List: BankServicesResult = await response.json();
        const Services = List.services_list;

        if (Array.isArray(Services)) {
            Services.forEach(item => {
                if (!item.image) {
                    item.image = defaultImage;
                }
            });
        }

        return {
            request_id: List.request_id,   
            services_list: Services,
        };

    } catch (error) {
        return {
            request_id: null,
            // @ts-ignore
            services_list: mockServices.services
        }
    }
};