import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { useState } from "react";
import { Envelope, Key, EyeSlash, Eye } from "@phosphor-icons/react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  function logar() {
    navigate("/products");
  }

  function verSenha() {
    setSenhaVisivel(!senhaVisivel);
  }

  function liberarBotao() {
    return !(EmailValidator.validate(email) && password.length >= 8);
  }

  return (
    <div className="flex font-roboto justify-center items-center min-h-screen w-full bg-gray-100 px-4">
      <div className="bg-white flex flex-col items-center w-full max-w-md p-6 rounded-md shadow-xl border-2 border-amber-400">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        <div className="w-full space-y-4">
          <label className="flex items-center w-full">
            <Envelope size={24} className="text-amber-500 mr-2" />
            <span className="whitespace-nowrap mr-2">E-mail:</span>
            <input
              className="flex-1 border-b-2 border-amber-400 outline-none p-1 rounded-md"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex items-center w-full">
            <Key size={24} className="text-amber-500 mr-2" />
            <span className="whitespace-nowrap mr-2">Senha:</span>
            <input
              className="flex-1 border-b-2 border-amber-400 outline-none p-1 rounded-md"
              type={senhaVisivel ? "text" : "password"}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={verSenha} className="ml-2">
              {senhaVisivel ? (
                <Eye size={24} className="text-gray-600" />
              ) : (
                <EyeSlash size={24} className="text-gray-600" />
              )}
            </button>
          </label>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4 font-semibold">
          Digite email e senha válidos <br /> para entrar
        </p>

        <button
          className="group relative inline-flex items-center justify-center h-10 px-6 mt-6 rounded-md bg-neutral-400 text-neutral-50 font-medium overflow-hidden disabled:opacity-50"
          type="button"
          disabled={liberarBotao()}
          onClick={logar}
        >
          <span className="absolute h-0 w-0 rounded-full bg-amber-400 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
          <span className="relative z-10">Entrar</span>
        </button>
      </div>
    </div>
  );
}
