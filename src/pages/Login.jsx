import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import { useState } from "react";
import { Envelope, Key, EyeSlash, Eye } from "@phosphor-icons/react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [button, setButton] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  function logar() {
    navigate("/products");
  }

  function verSenha() {
    setSenhaVisivel(!senhaVisivel);
  }

  function liberarBotao() {
    if (EmailValidator.validate(email) && password.length >= 8) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <>
      <div className="flex font-roboto justify-center items-center w-screen h-screen">
        <div className="bg-white flex h-[390px] flex-wrap w-[340px] justify-center items-center flex-col rounded-md shadow-xl border-solid border-2 border-amber-400">
          <h1 className="text-3xl weight mb-8">Login</h1>

          <div className="flex items-center justify-start flex-row h-fit w-full flex-wrap">
            <label
              className="flex items-center justify-center my-3 rounded-md ml-2"
              htmlFor=""
            >
              <Envelope size={24} /> *E-mail:
              <input
                className="ml-2 border-b-2 border-b-amber-400 rounded-md shadow-stone-600 outline-none p-px"
                type="text"
                id="email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </label>

            <label
              className="flex items-center justify-center my-3 h-7 rounded-md ml-2"
              htmlFor=""
            >
              <Key size={24} /> *Senha:
              <input
                className="ml-2 border-b-2 border-b-amber-400 rounded-md shadow-stone-600 p-px outline-none"
                type={senhaVisivel ? "text" : "password"}
                id="password"
                onChange={(pass) => setPassword(pass.target.value)}
              />
              <button onClick={verSenha}>
                {senhaVisivel ? (
                  <Eye size={24} className="bg-white h-7 rounded-md" />
                ) : (
                  <EyeSlash size={24} className="bg-white h-7 rounded-md" />
                )}
              </button>
            </label>
          </div>

          <p
            style={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Digite email e senha válidos
            <br /> para entrar
          </p>
          <button
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-neutral-400 px-6 font-medium text-neutral-50 mt-4"
            type="button"
            id=""
            disabled={liberarBotao()}
            onClick={logar}
          >
            <span
              disabled={liberarBotao()}
              className="absolute h-0 w-0 rounded-full bg-amber-400 transition-all duration-300 group-hover:h-56 group-hover:w-32"
            ></span>
            <span className="relative">Entrar</span>
          </button>
        </div>
      </div>
    </>
  );
}
