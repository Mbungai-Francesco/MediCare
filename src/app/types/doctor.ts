export interface Doctor{
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    speciality: string;
    available: boolean;
    image: string;
}