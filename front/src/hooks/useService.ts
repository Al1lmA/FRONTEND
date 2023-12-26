import {useDispatch, useSelector} from 'react-redux';
import {updateService} from "../store/selectedServiceSlice";
import axios from "axios";

export function useService() {
    const service = useSelector(state => state.selectedService.service);

    const dispatch = useDispatch()

    const setService = (value) => {
        dispatch(updateService(value))
    }

    const fetchService = async (service_id) => {
        const {data} = await axios(`http://127.0.0.1:8000/services/${service_id}`, {
            method: "GET"
        });

        setService(data)
    }

    return {
        service,
        setService,
        fetchService
    };
}