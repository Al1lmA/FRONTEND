import {useEffect, useState} from 'react'
import { GetFilteredServices, BankServicesResult } from '../modules/GetServices';
import Button from 'react-bootstrap/Button';
import "../styles/style.css"


function SearchServices({
    setServiceData,
    setTitleData,
}: {
    setServiceData: (data: BankServicesResult) => void;
    setTitleData: (data: any) => void;
}) {
    // Для фильтрации услуг
    const [titleData, settitleData] = useState<string>('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        settitleData(event.target.value);
    };

    const handleFilterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    };

    useEffect(() => {
    // Функция, которая будет выполнять фильтрацию данных
    const fetchTitledData = async () => {
    try {
        const response = await GetFilteredServices(titleData);
        setServiceData(response);
        setTitleData(titleData);
    } catch (error) {
        console.error('Error filtering services:', error);
    }
};
// Вызываем фильтрацию данных при изменении filterKeyword
fetchTitledData();
// Этот useEffect будет выполнен при изменении filterKeyword или currentPage
}, [titleData]);


return (
<>
    <form method="get" onSubmit={handleFilterSubmit} encType="multipart/form-data">
      <div className="search-box">
        <Button className="btn-search">
          <i className="fas fa-search"></i>
        </Button>
        <input
          type="text"
          name="txt"
          className="input-search"
          placeholder="..."
          value={titleData}
          onChange={handleFilterChange}
        />
      </div>
    </form>
</>
);
};

export default SearchServices;