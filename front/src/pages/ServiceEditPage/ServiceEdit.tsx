import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ServiceEdit.scss"
import { useService } from '../../hooks/useService';



const statuses: any = {
  active: 1,
  removed: 2,
};


const ServiceEdit = () => {
    const { id } = useParams();
    const ServiceId = id ? parseInt(id, 10) : null;
    
    const { service, sendService, fetchService } = useService();
    const [fileData, setFileData] = useState(null); // новое состояние для файла
    const [fineData, setFineData] = useState({
        title: '',
        image: null, // для файла изображения используем null в качестве начального значения
        text: '',
        status: 'active', // начальное состояние с текстовым значением
    });

    const [isDataFetched, setIsDataFetched] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);


    useEffect(() => {
        // Загружаем данные только один раз
        if (ServiceId !== null && !isDataFetched) {
            fetchService(ServiceId).then(() => {
                // после получения данных устанавливаем isDataFetched в true
                setIsDataFetched(true);
            });
        }
    }, [ServiceId, isDataFetched]);

    useEffect(() => {
        // Обновляем форму, когда данные fine изменились
        if (service && isDataFetched) {
            setFineData({
                title: service.title || '',
                image: service.image || null,
                text: service.text || '',
                status: service.status ? (service.status === statuses.active ? 'active' : 'removed') : 'active',
            });
        }
    }, [service, isDataFetched]);

    useEffect(() => {
        // Загружаем данные только один раз
        if (ServiceId !== null) {
            fetchService(ServiceId).then(() => {
                setIsDataFetched(true);
            });
        }
    }, []);

    useEffect(() => {
        let timer: any;
        if (submitSuccess) {
            // Показать сообщение
            const successMessage = document.querySelector('.submit-success-message');
            if (successMessage) successMessage.classList.add('show');
    
            // Скрыть сообщение после 3 секунд
            timer = setTimeout(() => {
                if (successMessage) successMessage.classList.remove('show');
                setSubmitSuccess(false); // Сбросить состояние, чтобы позволить повторное появление в будущем
            }, 3000);
        }
    
        // Очистка таймера, если компонент размонтируется до завершения таймаута
        return () => timer && clearTimeout(timer);
    }, [submitSuccess]); 


    
    

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const update = (e.target.type === 'file') ? e.target.files[0] : value;
        setFineData({ ...fineData, [name]: update });
    };

    const handleStatusChange = (e: any) => {
        // Меняем статус на текстовое представление для отображения
        setFineData({ ...fineData, status: e.target.value });
    };


    const handleFileChange = (e: any) => {
        // Когда пользователь выбирает файл, сохраняем его в состояние
        const file = e.target.files[0];
        if(file) {
            setFileData(file); // сохраняем файл, а не url
            // Также обновите fineData, чтобы сохранить имя файла
            setFineData({ ...fineData, image: file.name }); // предполагаем, что sendFine использует имя файла
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('title', fineData.title);
        formData.append('text', fineData.text);
        formData.append('status', statuses[fineData.status]);
    
        if (fileData) {
            formData.append('image', fileData);
        }
    
        sendService(ServiceId, formData).then(() => {
            // navigate("/fines");
            setSubmitSuccess(true);
        });
    };
    
    

    const statusOptions = [
        { text: "Действует", value: "active" },
        { text: "Удалён", value: "removed" }
    ];

    return (
        <div className="container-1">
            <h1>Редактировать Услугу</h1>
            {submitSuccess && <div className="submit-success-message">Услуга отредактирована</div>}
            <form onSubmit={handleSubmit} className="fine-form" encType="multipart/form-data">
                <label htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={fineData.title}
                    onChange={handleChange}
                />

                <label htmlFor="status">Статус</label>
                <select
                    className="form select"
                    id="status"
                    name="status"
                    value={fineData.status}
                    onChange={handleStatusChange}
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>

                <label htmlFor="image">Картинка</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                />

                <label htmlFor="text">Описание</label>
                <textarea
                    id="text"
                    name="text"
                    value={fineData.text}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">Редактировать</button>
            </form>
        </div>
    );
};

export default ServiceEdit