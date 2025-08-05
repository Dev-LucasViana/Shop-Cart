import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Carrega o carrinho do localStorage apenas 1x
  useEffect(() => {
    try {
      const stored = localStorage.getItem("shopcart_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (err) {
      console.error("Erro ao ler carrinho do localStorage:", err);
    }
  }, []);

  const increase = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem("shopcart_cart", JSON.stringify(updated));
  };

  const decrease = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updated);
    localStorage.setItem("shopcart_cart", JSON.stringify(updated));
  };

  const remove = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("shopcart_cart", JSON.stringify(updated));
  };

  const handleFinishOrder = () => {
    localStorage.removeItem("shopcart_cart");
    setCart([]);
    navigate("/Success");
  };

  const handleBack = () => {
    navigate("/products");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 sm:p-6 md:p-8 font-roboto min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 mb-6 sm:mb-8 text-center">
          Finalizar Compra
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <p className="text-lg sm:text-xl mb-4">
              Seu carrinho está vazio 😕
            </p>
            <button
              onClick={handleBack}
              className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
            >
              Voltar às compras
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 py-4 px-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain border rounded"
                  />
                  <div className="flex-1 w-full">
                    <p className="font-semibold text-center sm:text-left">
                      {item.title}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                      <button
                        onClick={() => decrease(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increase(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 text-center sm:text-left">
                      Valor unitário:{" "}
                      <span className="text-amber-600 font-semibold">
                        {item.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </p>
                  </div>
                  <div className="font-bold text-amber-600 text-lg text-center sm:text-right w-full sm:w-auto">
                    {(item.price * item.quantity).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
              <button
                onClick={handleBack}
                className="text-amber-600 font-medium hover:underline"
              >
                ⬅ Continuar comprando
              </button>

              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-gray-700">
                  Total do pedido:{" "}
                  <span className="text-amber-600">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>

                <button
                  onClick={handleFinishOrder}
                  className="mt-2 bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
