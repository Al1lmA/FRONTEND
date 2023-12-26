import "./RequestPage.sass"
import {useNavigate} from "react-router-dom";
import {useDraftRequest} from "../../hooks/useDraftRequest";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";

const RequestPage = () => {
    const navigate = useNavigate()

    const {is_authenticated } = useAuth()

    const {request, sendRequest, deleteRequest} = useDraftRequest()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/services")
        }
    }, [])

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
        <ServiceCard service={service} key={service.id}/>
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
                    <h3>Услуги в заявке</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>

            <div className="buttons-wrapper">

                <button className="order-button" onClick={handleAdd}>Отправить</button>

                <button className="delete-button" onClick={handleDelete}>Удалить</button>

            </div>


        </div>
    )
}

export default RequestPage