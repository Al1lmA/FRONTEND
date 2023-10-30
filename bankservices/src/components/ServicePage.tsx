import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import "../styles/stylesForFinePage.css"
import { GetService } from '../modules/GetService';

interface BankService {
    bank_service_id: number;
    title: string;
    button_text: string;
    short_description: string;
    description: string;
    img: string;
    service_status: string;
    image: string;
}

const Service = () => {
    const { id } = useParams(); // Получаем значение параметра :id из URL
    const ServiceId = id ? parseInt(id, 10) : null; // Преобразование в число или null

    const [service, setService] = useState<BankService | null>(null);

    useEffect(() => {
        if (ServiceId !== null) {
            GetService(ServiceId)
                .then((result) => {
                    if (result.service !== null) {
                        setService(result.service[0]);
                    }
                })
                .catch((error) => {
                    console.error('ашыпка:', error);
                });
        }
    }, [ServiceId]);

    if (!service) {
        return <div>Loading...</div>;
    }

    return (
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
            <cite>{service.description}</cite>
            <p className="credit">
              <strong>Sky Bank</strong>, <a>2023</a>
            </p>
          </figcaption>
        </figure>
      </div>
    );
};

export default Service;