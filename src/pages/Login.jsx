import { useNavigate } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import { useEffect, useState } from "react"

export default function Login(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [button, setButton] = useState(true)

    
    function logar(){
        
        
        navigate('/products')
    }
    function liberarBotao(){
        if (email && password) {
           setButton(false)
        }

    }



    return(
        <>
            <h1>Login</h1>

            <label htmlFor="">Email: </label>
            <input type="text" id="email" onChange={(email) => setEmail(email.target.value)}/><br />

            <label htmlFor="">Senha: </label>
            <input type="text" id="password" onChange={(password) => setPassword(password.target.value)}/><br /><br />

            <button type="button" id="login-button" disabled={button} onClick={logar}>Entrar</button>
        </>
    )
}