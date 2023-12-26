import React from 'react';
import { Link } from 'react-router-dom';

import "./ServiceCard.css"
import CustomButton from "../CustomButton/CustomButton";
import {useDraftRequest} from "../../hooks/useDraftRequest";

import {useAuth} from "../../hooks/useAuth";


const ServiceCard = ({service}:{service: any}) => {

  const {is_authenticated, is_moderator} = useAuth()

  const {addServiceToRequest, deleteRequestFromService} = useDraftRequest()

  const handleAdd = async () => {
    await addServiceToRequest(service.id)
  }

  const handleDelete = async () => {
    await deleteRequestFromService(service.id)
  }

  const imageUrl = service.image

  return (
    <>


<div className="box-item">
<div className="flip-box">
    <div className="flip-box-front text-center" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div className="inner color-white">
        <h3 className="flip-box-header">{service.title}</h3>
        <img src="https://s25.postimg.cc/65hsttv9b/cta-arrow.png" alt="" className="flip-box-img" />
    </div>
    </div>
    <div className="flip-box-back text-center" style={{ backgroundImage: `url(${service.image})` }}>
    <div className="inner color-white">
        <h3 className="flip-box-header">{service.title}</h3>
        {/* <p>{serviceData.short_description}</p> */}
        <Link to={`/services/${service.id}`}>
          <CustomButton text="Подробнее"  />
        </Link>
        <div>
        {is_authenticated && !location.pathname.includes("draft") && <CustomButton text="Добавить" onClick={handleAdd} /> }
        </div>
        {is_authenticated && location.pathname.includes("draft") && <CustomButton text="Удалить" onClick={handleDelete} /> }
      </div>
    </div>
    </div>
</div>


</>
  )
}

export default ServiceCard