import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "./ProfilePage.css"
import { useDraftRequest } from "../../hooks/useDraftRequest"

const ProfilePage = () => {

    const navigate = useNavigate()

    const {logOut, user_name, } = useAuth()

    const { resetRequest } = useDraftRequest()

    const handleLogOut = async () => {
        await logOut()
        resetRequest()
        navigate("/services")
    }


    

    
    return (
        <section> 

          <div className="signin"> 
       
           <div className="content"> 
       
            <h2>Профиль</h2> 

            <h2>{user_name}</h2>

            <button className="EntButton" onClick={handleLogOut}>Выйти</button>
            
       
           </div> 
       
          </div> 
       
         </section> 
    )
}

export default ProfilePage