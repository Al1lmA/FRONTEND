import "./RequestPage.sass"
import {useNavigate, useParams} from "react-router-dom";
import {useDraftRequest} from "../../hooks/useDraftRequest";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";

const RequestPage = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const RequestID = id ? parseInt(id, 10) : null; // Преобразование в число или null


    const navigate = useNavigate()

    const {is_authenticated } = useAuth()

    const {request, sendRequest, deleteRequest, fetchDraftRequest} = useDraftRequest()

    // useEffect(() => {
    //     if (!is_authenticated) {
    //         navigate("/services")
    //     }
    // }, [])

    useEffect(() => {
        if(RequestID !== null) {
            fetchDraftRequest(RequestID);
        }
    }, [RequestID]);

    if (!is_authenticated){
        return
    }

    if (request == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const cards = request.BankServices?.map(service  => (
        <ServiceCard service={service} key={service.id} onServiceAction={() => fetchDraftRequest(RequestID)}/>
    ))

    const handleAdd = async () => {
        await sendRequest()
        navigate("/requests")
    }

    const handleDelete = async () => {
        await deleteRequest()
        navigate("/services")
    }

    return (
        <div className="breach-page-wrapper">

            <div className="fines-wrapper">
                <div className="top">
                    <h3>Услуги в заявке {request &&  request.status !== 1 && (<h3>Рейтинг БКИ: {request.rating}</h3>)}</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>


        {request && request.status === 1 && (
            <div className="buttons-wrapper">
                <button className="order-button" onClick={handleAdd}>Отправить</button>
                <button className="delete-button" onClick={handleDelete}>Удалить</button>
            </div>
        )}
            


        </div>
    )
}

export default RequestPage