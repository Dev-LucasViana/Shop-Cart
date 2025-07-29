import { useNavigate } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";

export default function Sucess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <CheckCircle size={72} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Compra Finalizada!
        </h1>
        <p className="text-gray-600 mb-6">
          Obrigado por sua compra. Seu pedido foi processado com sucesso e em
          breve será entregue.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-full transition"
        >
          Voltar à loja
        </button>
      </div>
    </div>
  );
}
