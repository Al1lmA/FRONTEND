import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useEffect } from 'react';
import "../../styles/NavBar.scss";

const Navbar = () => {

    // const {is_authenticated, user_name, auth} = useAuth()

    // useEffect(() => {
    //     auth()
    // }, []);


    return (
        <div>
            <nav className="mask">

            <Link to={`/services`}>
                    <a href="#">bank</a>
            </Link>

            <ul className="list">

                <Link to={`/services`}>
                    <li><a href="#">services</a></li>
                </Link>

                <Link to={`/requests`}>
                    <li><a href="#">requests</a></li>
                </Link>


                    <Link to={`/login`}>
                        <li><a href="#">Вход</a></li>
                    </Link>
   
{/* 
                {is_authenticated && 
                    <Link to={`/profile`}>
                        <li><a href="#">{user_name}</a></li>
                    </Link>
                }       */}


            </ul>
        </nav>
        </div>
    )
}

export default Navbar