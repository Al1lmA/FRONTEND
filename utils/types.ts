export interface Request {
    id: number;
    services: Service[];
    user: number;
    closed_date: Date | null;
    created_date: Date | null;
    formated_date: Date | null;
    status: string;
}

export interface Service {
    id: number;
    title: string;
    price: string;
    status: number;
    image: string;
    text: string;
}