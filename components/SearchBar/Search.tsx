import {Dispatch} from "react";

import "./Search.css"
import Button from "react-bootstrap/esm/Button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const SearchServices = ({ title, setTitle }: {title:string, setTitle: Dispatch<string>}) => {

    const handleChange = (value: string) => {
        setTitle(value)
    }

    return (
        <>
        <form method="get" encType="multipart/form-data">
            <div className="search-box">
                <Button className="btn-search">
                <FontAwesomeIcon icon={faSearch} />
                </Button>
                <input
                type="text"
                name="txt"
                className="input-search"
                placeholder="..."
                value={title}
                onChange={(e) => handleChange(e.target.value)}
                />
            </div>
    </form>
        </>
    )
}

export default SearchServices;
