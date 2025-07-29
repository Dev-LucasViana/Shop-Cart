import { useNavigate } from "react-router-dom";

export default function CartModal({ cart, setCart, showModal, setShowModal }) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return showModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Carrinho</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">O carrinho está vazio.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-amber-600 font-bold text-sm">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? setCart(cart.filter((p) => p.id !== item.id))
                          : setCart(
                              cart.map((p) =>
                                p.id === item.id
                                  ? { ...p, quantity: p.quantity - 1 }
                                  : p
                              )
                            )
                      }
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        setCart(
                          cart.map((p) =>
                            p.id === item.id
                              ? { ...p, quantity: p.quantity + 1 }
                              : p
                          )
                        )
                      }
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        setCart(cart.filter((p) => p.id !== item.id))
                      }
                      className="ml-2 text-red-500 hover:text-red-600"
                      title="Remover"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right mt-4 font-bold">
              <button
                className="mr-5 hover:text-amber-500 transition-all"
                onClick={() => navigate("/checkout")}
              >
                Finalizar Compra
              </button>
              Total: R$ {total.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
}
