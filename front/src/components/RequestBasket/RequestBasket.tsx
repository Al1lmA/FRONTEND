import "./RequestBasket.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDraftRequest} from "../../hooks/useDraftRequest";

const RequestBasket = () => {
    const {request, fetchDraftRequest} = useDraftRequest()

    useEffect(() => {
        fetchDraftRequest()
    }, [])

    return (
        <>
        {/* <Link to="/requests/draft/" className="lesson-constructor-container" style={{ textDecoration: 'none' }}>
            <span className="title">Новая заявка</span>
            {request?.BankServices?.length > 0 && <span className="badge">{request?.BankServices?.length}</span>}
        </Link> */}
        <Link
        to={request ? "/services/draft/" : "#"}
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