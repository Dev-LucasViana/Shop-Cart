import { useNavigate } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import { useState } from "react"
import '../styles/LoginPageStyle.css'
import { Envelope, Key, EyeSlash, Eye } from '@phosphor-icons/react'

export default function Login(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [button, setButton] = useState('')
    const [senhaVisivel, setSenhaVisivel] = useState(false)
    
    function logar(){ 
        navigate('/products')
    }

    function verSenha() {
        setSenhaVisivel(!senhaVisivel)
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
            <div className="background-container">
                <div className="blur-container">
                        <div className="main-container">
                        <h1>Login</h1>

                        <div className="forms-container">
                            
                            <label htmlFor=""><Envelope size={18} /> *E-mail: </label>
                            <input type="text" id="email" onChange={(email) => setEmail(email.target.value)}/>

                            <label htmlFor=""><Key size={18} /> *Senha: </label>
                            <input type={senhaVisivel ? "text" : "password"} id="password" onChange={(pass) => setPassword(pass.target.value)}/>
                            <button className="eye-button" onClick={verSenha}>{senhaVisivel ? <Eye size={24} /> : <EyeSlash size={24} />}</button>
                        </div>

                        <p style={{fontWeight:"bold", textAlign:"center"}}>Digite email e senha válidos<br/> para entrar</p>
                        <button type="button" id="login-button" disabled={ liberarBotao() } onClick={logar}>Entrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}