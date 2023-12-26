import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import "./navbar.scss"

const Navbar = () => {

    const {is_authenticated, is_moderator ,user_name, auth } = useAuth()

    useEffect(() => {
        auth()
    }, []);


    return (
        <div>
            <nav className="mask">

            <Link to={`/services`}>
                Sky Bank
            </Link>

            <ul className="list">

                <Link to={`/services`}>
                    <li>Услуги</li>
                </Link>

                {is_moderator &&
                <Link to={`/services_edit`}>
                    <li>Редактировать Услуги</li>
                </Link>
                }


                {is_authenticated && 
                <Link to={`/requests`}>
                    <li>Заявки</li>
                </Link>
                }

                {!is_authenticated && 
                    <Link to={`/login`}>
                        <li>Вход</li>
                    </Link>
                }      

                {is_authenticated && 
                    <Link to={`/profile`}>
                        <li>{user_name}</li>
                    </Link>
                }      


            </ul>
        </nav>
        </div>
    )
}

export default Navbar
