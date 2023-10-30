import defaultImage from '../assets/default.jpg';

const mockServices = [
    {
        bank_service_id: 1,
        title: "default",
        button_text: "default",
        short_description: "default",
        description: "default",
        img: "",
        service_status: "действует",
        image: defaultImage,
    }
]


export const getMockServices = () => {
    return {
        services: mockServices,
    };
};