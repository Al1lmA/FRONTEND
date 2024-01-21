// import React from 'react';
import { Link } from 'react-router-dom';

import "./ServiceCard.css"
import CustomButton from "../CustomButton/CustomButton";
import {useDraftRequest} from "../../hooks/useDraftRequest";

import {useAuth} from "../../hooks/useAuth";

import defaultImage from '../../assets/Default.jpg';


const ServiceCard = ({service, onServiceAction}:{service: any, onServiceAction: (id?: number) => Promise<void>}) => {

  const {is_authenticated } = useAuth()

  const {request, addServiceToRequest, deleteRequestFromService} = useDraftRequest()

  const handleAdd = async () => {
    await addServiceToRequest(service.id)
    if(onServiceAction) {
      onServiceAction();
    }
  }

  const handleDelete = async () => {
    await deleteRequestFromService(service.id)
    if (onServiceAction) {
      onServiceAction(service.id);
    }
  }

  const imageUrl = service.image || defaultImage

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
    <div className="flip-box-back text-center" style={{ backgroundImage: `url(${imageUrl})` }}>
    <div className="inner color-white">
        <h3 className="flip-box-header">{service.title}</h3>
        {/* <p>{serviceData.short_description}</p> */}
        <Link to={`/services/${service.id}`}>
          <CustomButton text="Подробнее"  />
        </Link>
        <div>
        {is_authenticated && location.pathname.includes("services") && <CustomButton text="Добавить" onClick={handleAdd} /> }
        </div>
        {request && request.status === 1 && is_authenticated && location.pathname.includes("requests") && <CustomButton text="Удалить" onClick={handleDelete} /> }
      </div>
    </div>
    </div>
</div>


</>
  )
}

export default ServiceCard