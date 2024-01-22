import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ServicePage.css"
import {useService} from "../../hooks/useService";
import defaultImage from '../../assets/Default.jpg';

const ServicePage = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const ServiceId = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const {service, fetchService} = useService()

    useEffect(() => {
        if (ServiceId !== null) {
            fetchService(ServiceId)
        }
    }, [ServiceId]);

    if (!service) {
        return <div>Loading...</div>;
    }

    const imageUrl = service.image || defaultImage

    return (
    <>
        <div className="wrapper">
        <figure className="card">
          <img
            className="img-order"
            src={imageUrl}
            width="640"
            height="640"
            alt=""
          />
          <figcaption>
            <blockquote>{service.title}</blockquote>
            <cite>{service.text}</cite>
            <p className="credit">
              <strong>Sky Bank</strong>, <a>2023</a>
            </p>
          </figcaption>
        </figure>
      </div>
    </>

    );
};

export default ServicePage;