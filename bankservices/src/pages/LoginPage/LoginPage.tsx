import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

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
        <div>
            <h3>Авторизация</h3>

            <form onSubmit={handleSubmit}>

                <input type="text" name="login"/>
                <input type="password" name="password"/>
                <button type="submit">Войти</button>

            </form>

        </div>
    )
}

export default LoginPage;