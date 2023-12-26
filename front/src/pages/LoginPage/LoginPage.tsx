import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "./LoginPage.css"

const LoginPage = () => {


    const {login, auth} = useAuth()
    
    const navigate = useNavigate()


    const handleSubmit = async(e: any ) => {
        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const flag = await login(formData)
        
        if (flag) {
            navigate("/services")
        }
    }

    const handleAuth  = async() => {
        console.log("handleAuth")
        const flag = await auth()
        if(flag){
            navigate("/services")
        }
    }

    useEffect(() => {
        handleAuth()
    }, []);
    

    return (
<section> 

          <div className="signin"> 
       
           <div className="content"> 
       
            <h2>Вход</h2> 
       
            <form className="form" onSubmit={handleSubmit}> 
       
                <div className="inputBox"> 
        
                <input type="text" name="username"/>
        
                </div> 
        
                <div className="inputBox"> 
        
                <input type="password" name="password"/>
        
                </div>
    
                <button className="EntButton" type="submit">Вход</button> 
            </form> 
       
           </div> 
       
          </div> 
       
         </section> 
    )
}

export default LoginPage;
