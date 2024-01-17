import {useState, useEffect, useMemo} from 'react'
import { useTable } from 'react-table'
import { Link } from 'react-router-dom';

import SearchFines from '../../components/SearchBar/Search.js';
import "./ServicesTable.scss"
import axios from "axios";
import {useSsid} from "../../hooks/useSsid.js";
import { mockServices } from '../../assets/Mock.js';
import { useAuth } from '../../hooks/useAuth.js';

import CustomButton from '../../components/CustomButton/CustomButton.js';
import defaultImage from '../../assets/Default.jpg'
import { useService } from '../../hooks/useService.js';
import { useFilters } from '../../hooks/useFilters.js';

const statuses = [
    {
        id: 1,
        name: "Действует"
    },
    {
        id: 2,
        name: "Удалён"
    },
]

const ServicesTable = () => {
    
    const [services, setServices] = useState({
        request_id: null,
        services:[],
    });

    const { filters, updateTitle } = useFilters();

    const { session_id } = useSsid()

    const {is_moderator} = useAuth()

    const { sendService } = useService()
    const searchServices = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8000/services/search/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    title: filters.title
                }
            });
    
            setServices(data);
        } catch (error) {
            console.error("Не удалось загрузить данные с сервера.", error);
            const filteredFines = filterServices(mockServices, filters.title);
            setServices({
                request_id: null,
                services: filteredFines,
            });
        }
    }

    const filterServices = (services: any, searchText: any) => {
        return services.filter((service: any) => {
            const titleLowerCase = service.title.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return titleLowerCase.includes(searchTextLowerCase);
        });
    };
    

   

    const data = useMemo(() => services.services, [services.services])

    const formData = new FormData();
    formData.append('status', "2");

    const handleDelete = async (id: any) => {
        try {
            await sendService(id, formData);
            searchServices();
        } catch (error) {
            console.error("Произошла ошибка при удалении штрафа", error);
        }
    };


  

    const columns = useMemo(
        () => [
            // Define columns as per your data
            {
                Header: "Заголовок",
                accessor: "title"
                // You can also add Cell property here to customize the rendering
            },
            // {
            //     Header: "Статус",
            //     accessor: "status",
            //     Cell: ({ value }) => { 
            //         const statusObject = statuses.find(status => status.id === value);
            //         return statusObject ? statusObject.name : 'Неизвестный статус';
            //     }
            //     // You can also add Cell property here to customize the rendering
            // },
            {
                Header: "Изображение",
                accessor: "image",
                Cell: ({ value }) => <img src={value || defaultImage} alt="Service" style={{ width: "100px", height: "auto" }} />
            },
            {
                Header: "Действия",
                id: "actions",
                // Cell property может быть функцией, которая принимает объект с данными ячейки
                Cell: ({ row }) => (
                    <div>
                    <Link to={`/services_edit/${row.original.id}`}>
                        <CustomButton text="Редактировать"  />
                    </Link>
                    <CustomButton onClick={() => handleDelete(row.original.id)} text="Удалить" />
                    </div>
                )
            },


            // Add other columns as needed
            
        ],
        []
    )

    // Use useTable hook to create table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    useEffect(() => {
        searchServices()
    }, [filters.title])

    return (
        <>
        {is_moderator &&
        <div className="fines-wrapper">
            <div className="top-container">
                <div className='search_in_menu'>
                <SearchFines title={filters.title} setTitle={(newTitle) => {
                    updateTitle(newTitle);
                    searchServices(); }}
                />
                </div>
                <Link to="/services_edit/add_new">
                    <CustomButton text="Добавить услугу" />
                </Link>
            </div>
            <div className="bottom-container">
                {/* Create table structure */}
                <table {...getTableProps()} className="fines-table">
                    <thead>
                        {/* Loop over header rows */}
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {/* Loop over headers in each row */}
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        }

</>
    )

}

export default ServicesTable;