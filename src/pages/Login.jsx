import { useNavigate } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import { useState } from "react"
import '../styles/LoginPageStyle.css'

export default function Login(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function logar(){ 
        navigate('/products')
    }

    function liberarBotao() {
        if (EmailValidator.validate(email) && password.length >= 8) {
            return false
        } else {
            return true
        }
    }

    return(
        <>
            <h1>Login</h1>

            <label htmlFor="">Email: </label>
            <input type="text" id="email" onChange={(email) => setEmail(email.target.value)}/><br />

            <label htmlFor="">Senha: </label>
            <input type="text" id="password" onChange={(password) => setPassword(password.target.value)}/><br /><br />

            <button type="button" id="login-button" disabled={ liberarBotao() } onClick={logar}>Entrar</button>
        </>
    )
}