import { useNavigate } from "react-router-dom"

export default function Login(){

    const navigate = useNavigate()

    function logar(){
        navigate('/products')
    }

    return(
        <>
            <h1>Login</h1>

            <label htmlFor="">Email: </label>
            <input type="text"/><br />

            <label htmlFor="">Senha: </label>
            <input type="text" /><br /><br />

            <button type="button" onClick={logar}>Entrar</button>
        </>
    )
}