import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../styles/style.css"

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


const ServiceCard: React.FC<{serviceData: BankService}> = ({serviceData}) => {
  return (

    <div className="box-item">
    <div className="flip-box">
        <div className="flip-box-front text-center" style={{ backgroundImage: `url(${serviceData.image})` }}>
        <div className="inner color-white">
            <h3 className="flip-box-header">{serviceData.title}</h3>
            <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="" className="flip-box-img" />
        </div>
        </div>
        <div className="flip-box-back text-center" style={{ backgroundImage: `url(${serviceData.image})` }}>
        <div className="inner color-white">
            <h3 className="flip-box-header">{serviceData.title}</h3>
            <p>{serviceData.short_description}</p>
            <Link to={`/services/${serviceData.bank_service_id}`}>
            <Button className="flip-box-button">{serviceData.button_text}</Button>
            </Link>
        </div>
        </div>
    </div>
    </div>

  )
}

export default ServiceCard