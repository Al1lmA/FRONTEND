import {useState, useEffect} from 'react'
import {
    BankServicesResult,
    GetFilteredServices
} from '../modules/GetServices.js'
import ServiceCard from './ServiceCard.js';
import SearchServices from './Search.js';
// import SearchFines from './Search.tsx';
// import "../styles/main_menu.css"
// import "../styles/search_button.css"
import "../styles/style.css"
// import FiltrationGeographicalObject from "./Filtration.tsx";


function Services() {
    
    const [service, setService] = useState<BankServicesResult>({
        request_id: null,
        services_list:[],
    });

    const fetchData = async (titleData: any) => {
        const data = await GetFilteredServices(titleData);
        setService(data);
    };

    useEffect(() => {
        fetchData(titleData);
    },[]);

    const setServiceData = (data: any) => {
        console.log('After filtration: ', data)
        setService(data);
    }

    const [titleData, setTitleData] = useState('');


    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
            
            <SearchServices
                setServiceData={setServiceData}
                setTitleData={setTitleData}
            />

            <div className="box-container">
                {service.services_list.map((object) => (
                    <ServiceCard serviceData={object}/>
                ))}
            </div>
        </>
    );
};

export default Services;