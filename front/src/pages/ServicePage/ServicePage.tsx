import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ServicePage.css"
import {useService} from "../../hooks/useService";
import { mockServices } from '../../assets/Mock';

const ServicePage = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const ServiceId = id ? parseInt(id, 10) : 0; // Преобразование в число или null

    const {service, fetchService, setService} = useService()

    useEffect(() => {
        if (ServiceId !== null) {
            fetchService(ServiceId)
        }
    }, [ServiceId]);

    if (!service) {
      const mockService = mockServices.find(service => service.id === ServiceId);
      if (mockService) {
          setService(mockService);
      } else {
          return <div>Услуга не найдена</div>;
      }
    }

    return (
    <>
        <div className="wrapper">
        <figure className="card">
          <img
            className="img-order"
            src={service.image}
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