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
    if (EmailValidator.validate(email) && password.length >= 8) {
      navigate("/products");
    }
  }

  function verSenha() {
    setSenhaVisivel(!senhaVisivel);
  }

  function liberarBotao() {
    return !(EmailValidator.validate(email) && password.length >= 8);
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 px-4 font-roboto">
      <div className="bg-white w-full max-w-[95%] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:scale-105 transition-transform duration-300 p-6 sm:p-8 rounded-md shadow-xl border-2 border-amber-400">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
          Login
        </h1>

        <div className="space-y-6">
          <label className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-2">
            <div className="flex items-center gap-2">
              <Envelope size={22} className="text-amber-500 flex-shrink-0" />
              <span className="whitespace-nowrap text-sm sm:text-base">
                E-mail:
              </span>
            </div>
            <input
              className="w-full border-b-2 border-amber-400 outline-none px-2 py-1 rounded-md text-sm sm:text-base"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-2">
            <div className="flex items-center gap-2">
              <Key size={22} className="text-amber-500 flex-shrink-0" />
              <span className="whitespace-nowrap text-sm sm:text-base">
                Senha:
              </span>
            </div>
            <div className="flex w-full items-center">
              <input
                className="flex-1 border-b-2 border-amber-400 outline-none px-2 py-1 rounded-md text-sm sm:text-base"
                type={senhaVisivel ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={verSenha} className="ml-2">
                {senhaVisivel ? (
                  <Eye size={22} className="text-gray-600" />
                ) : (
                  <EyeSlash size={22} className="text-gray-600" />
                )}
              </button>
            </div>
          </label>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="group relative inline-flex items-center justify-center h-10 px-6 rounded-md bg-neutral-400 text-neutral-50 font-medium overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            type="button"
            disabled={liberarBotao()}
            onClick={logar}
          >
            <span className="absolute h-0 w-0 rounded-full bg-amber-400 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
            <span className="relative z-10">Entrar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
