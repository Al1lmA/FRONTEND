import {useState, useEffect} from 'react'
import SearchServices from '../../components/SearchBar/Search.js';
import ServiceCard from "../../components/ServiceCard/ServiceCard.js";
import RequestBasket from "../../components/RequestBasket/RequestBasket";
import "./ServicesPage.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import {mockServices} from "../../assets/Mock.js"
import { useFilters } from '../../hooks/useFilters.js';




const Services = () => {

    type MyType = number | null;
    const [request_id, setRequestID] = useState<MyType>(null);

    const [servicesList, setServices] = useState({
        services: [],
    });
    


    const { filters, updateTitle } = useFilters();
    const { session_id } = useSsid()

    const searchServices = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/services/search/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: filters.title
                }
            });
            setRequestID(data.request_id)
    
            setServices({
                services: data.services
            });
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredServices = filterServices(mockServices, filters.title);
            setRequestID(null)
            setServices({
                services: filteredServices,
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
    }, [filters.title])

    return (
        <div className="fines-wrapper">
            <div className="top-container">
                <div className='search_in_menu'>
                    <SearchServices title={filters.title} setTitle={(newTitle) => {
                   updateTitle(newTitle);
                   searchServices();
                 }}/>
                </div>
                <RequestBasket request_id = {request_id} />
            </div>

            <div className="bottom-container">
                {servicesList.services.map((service: any) => {
                    return <ServiceCard service={service} key={service.id} onServiceAction={searchServices}/>
                })}
            </div>

        </div>
    )
}

export default Services;
