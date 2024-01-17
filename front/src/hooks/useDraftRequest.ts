import {useDispatch, useSelector} from 'react-redux';
import {
    updateRequest
} from "../store/draftRequestSlice";
import axios from "axios";
import {useSsid} from "./useSsid";

export function useDraftRequest() {

    const { session_id } = useSsid()

    const request = useSelector(state => state.draftRequest.request);

    const dispatch = useDispatch()

    const setRequest = (value: any) => {
        dispatch(updateRequest(value))
    }

    const resetRequest = () => {
        dispatch(updateRequest(null))
    }

    const fetchDraftRequest = async (request_id: any) => {

        const response = await axios(`http://localhost:8000/requests/${request_id}/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status != 404)
        {
            setRequest(response.data)
        }
    }

    const addServiceToRequest = async (service_id: any) => {
        const response = await axios(`http://localhost:8000/services/${service_id}/add_to_request/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })

        if (response.status == 200)
        {
            setRequest(response.data)
        }
    }

    // const saveRequest = async () => {
    //     try {

    //         await axios(`http://localhost:8000/requests/${request.id}/update/`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-type": "application/json; charset=UTF-8",
    //                 'authorization': session_id
    //             },
    //             data: request
    //         })

    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    const sendRequest = async () => {

        const response = await axios(`http://localhost:8000/requests/update_status_user/`, {
            method: "PUT",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            resetRequest()
        }
    }

    const deleteRequest = async () => {

        const response = await axios(`http://localhost:8000/requests/${request.id}/delete/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200)
        {
            resetRequest()
        }
    }

    const deleteRequestFromService = async (service_id: any) => {
        const response = await axios(`http://localhost:8000/requests/${request.id}/delete_service/${service_id}/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 200) {
            setRequest(response.data)
        }
    }

    return {
        request,
        setRequest,
        addServiceToRequest,
        sendRequest,
        deleteRequest,
        deleteRequestFromService,
        fetchDraftRequest,
        resetRequest,
    };
}