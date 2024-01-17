import "./RequestBasket.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftRequest} from "../../hooks/useDraftRequest";

const RequestBasket = ({request_id}: {request_id: number | null}) => {
    const {request, fetchDraftRequest} = useDraftRequest()


    useEffect(() => {
        if(request_id !== null) {
            fetchDraftRequest(request_id);
        }
    }, [request_id]);

    return (
        <>
        <Link
        to={`/requests/${request_id}/`}
        onClick={(e) => { if (request == null) e.preventDefault(); }}
        className={`lesson-constructor-container ${request == null ? 'disabled-link' : ''}`} 
    >
        <span className="title">Новая заявка</span>
        {request?.BankServices?.length > 0 && <span className="badge">{request?.BankServices?.length}</span>}
    </Link>
    </>
    )
}

export default RequestBasket