import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Basket, House } from "@phosphor-icons/react";
import CartModal from "../components/cartModal";

export default function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("shopcart_cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shopcart_cart", JSON.stringify(cart));
  }, [cart]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const addCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <CartModal
        cart={cart}
        setCart={setCart}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/* Cabeçalho Responsivo */}
      <div className="bg-amber-500 font-roboto flex flex-wrap gap-4 items-center justify-center p-4">
        <div className="flex flex-wrap justify-center items-center gap-6 w-full md:w-auto">
          <h2
            className="flex items-center text-xl md:text-2xl text-white cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Início <House className="mx-1" size={24} weight="bold" />
          </h2>
          <h2
            className="flex items-center text-xl md:text-2xl text-white cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            Carrinho <Basket className="ml-1" size={24} />
          </h2>
          <h2
            className="text-xl md:text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log-out
          </h2>
        </div>
      </div>

      {/* Lista de produtos com grid responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200 p-6">
        {data.map((element) => (
          <div
            key={element.id}
            className="group relative bg-white rounded-md shadow hover:shadow-lg transition-all p-4 flex flex-col justify-between"
          >
            <div
              className="cursor-pointer flex flex-col items-center"
              onClick={() => navigate(`/products/${element.id}`)}
            >
              <img
                className="w-40 h-40 object-contain mb-4"
                src={element.image}
                alt={element.title}
              />
              <p className="text-sm font-medium text-center">{element.title}</p>
            </div>

            <div className="mt-4">
              <p className="text-amber-600 font-semibold">
                R$ <span className="text-xl">{element.price}</span>
              </p>
              <button
                className="flex items-center gap-2 border-2 border-amber-500 px-3 py-1 rounded-full mt-2 hover:text-amber-500 transition"
                onClick={() => addCart(element)}
              >
                <ShoppingCart size={20} /> Adicionar ao carrinho
              </button>
            </div>

            <div
              onClick={() => navigate(`/products/${element.id}`)}
              className="absolute bottom-[-2.5rem] left-0 w-full h-10 bg-amber-500 text-white items-center justify-center rounded-md z-10 
            opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
            transition-all duration-300 shadow-lg cursor-pointer flex"
            >
              <h3>Ver detalhes</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Botão flutuante visível em qualquer tela */}
      <button
        className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition z-40"
        onClick={() => setShowModal(true)}
      >
        Ver carrinho ({totalItems})
      </button>
    </>
  );
}
