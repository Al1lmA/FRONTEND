import defaultImage from '../assets/default.jpg';

const mockServices = [
    {
        bank_service_id: 1,
        title: "ХУЙ",
        button_text: "пойти нахуй",
        short_description: "ну и хуйня",
        description: "пиздец",
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