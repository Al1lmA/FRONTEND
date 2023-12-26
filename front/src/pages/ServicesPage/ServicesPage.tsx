import {useState, useEffect} from 'react'
import SearchServices from '../../components/SearchBar/Search.js';
import ServiceCard from "../../components/ServiceCard/ServiceCard.js";
import RequestBasket from "../../components/RequestBasket/RequestBasket";
import "./ServicesPage.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import {mockServices} from "../../assets/Mock.js"




const Services = () => {
    
    const [services, setServices] = useState({
        request_id: null,
        services:[],
    });

    const [titleData, setTitlePage] = useState<string>("");
    const { session_id } = useSsid()

    const searchServices = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/services/search`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: titleData
                }
            });
    
            setServices(data);
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredFines = filterServices(mockServices, titleData);
            setServices({
                request_id: null,
                services: filteredFines,
            });
        }
    }

    const filterServices = (services: any, searchText: any) => {
        return services.filter((service: any) => {
            const titleLowerCase = service.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };

    useEffect(() => {
        searchServices()
    }, [titleData])

    return (
        <div className="fines-wrapper">
            <div className="top-container">
                <div className='search_in_menu'>
                    <SearchServices title={titleData} setTitle={setTitlePage}/>
                </div>
                <RequestBasket />
            </div>

            <div className="bottom-container">
                {services.services.map((service) => {
                    return <ServiceCard service={service} key={service.id}/>
                })}
            </div>

        </div>
    )
}

export default Services;
