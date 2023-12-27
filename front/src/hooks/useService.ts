import {useDispatch, useSelector} from 'react-redux';
import {updateService} from "../store/selectedServiceSlice";
import axios from "axios";
import { useSsid } from './useSsid';

export function useService() {
    const service = useSelector(state => state.selectedService.service);

    const dispatch = useDispatch()
    const { session_id } = useSsid()

    const setService = (value: any) => {
        dispatch(updateService(value))
    }

    const fetchService = async (service_id: any) => {
        const {data} = await axios(`http://127.0.0.1:8000/services/${service_id}`, {
            method: "GET"
        });

        setService(data)
    }

    const sendService = async (service_id: any, ServiceData: any) => {
        try {
            const response = await axios({
                method: 'PUT',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/services/${service_id}/edit/`,
                data: ServiceData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
    
            setService(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending service data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }

    const createService = async (ServiceData: any) => {
        try {
            const response = await axios({
                method: 'POST',
                headers: {
                    'authorization': session_id
                },
                url: `http://127.0.0.1:8000/services/add/`,
                data: ServiceData,  // Передаем данные, которые хотим изменить, в теле запроса
                
            });
    
            setService(response.data); // Обновляем состояние или что-то в этом роде
        } catch (error) {
            console.error("Error sending service data: ", error);
            // Обработка ошибки, если получение ответа или запрос в принципе не удался
        }
    }

    return {
        service,
        setService,
        fetchService,
        sendService,
        createService
    };
}