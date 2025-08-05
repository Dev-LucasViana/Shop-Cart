import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Basket, House, SignOut } from "@phosphor-icons/react";
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

      {/* Cabeçalho */}
      <div className="bg-amber-500 font-roboto p-3">
        <div className="flex flex-wrap gap-4 justify-start items-center w-full max-w-5xl mx-auto px-4">
          <h2
            onClick={() => navigate("/products")}
            className="flex items-center text-xl sm:text-2xl text-white cursor-pointer"
          >
            Início <House className="mx-1" size={24} />
          </h2>
          <h2
            onClick={() => navigate("/checkout")}
            className="flex items-center text-xl sm:text-2xl text-white cursor-pointer"
          >
            Carrinho <Basket className="ml-1" size={24} />
          </h2>
          <h2
            onClick={() => navigate("/")}
            className="flex items-center text-xl sm:text-2xl text-white cursor-pointer"
          >
            Log-out <SignOut className="ml-1" size={24} />
          </h2>
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="bg-gray-200 py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-4 gap-y-12">
          {data.map((element) => (
            <div
              key={element.id}
              className="group relative bg-white rounded-md shadow-sm p-3 flex flex-col items-center justify-between h-[280px] cursor-pointer transition-all"
            >
              <img
                className="w-[100px] h-[100px] object-contain"
                onClick={() => navigate(`/products/${element.id}`)}
                src={element.image}
                alt={element.title}
              />
              <p className="text-xs mt-2 line-clamp-2 text-center">
                {element.title}
              </p>
              <p className="flex items-center text-amber-500 text-sm mt-1">
                R$
                <span className="text-base font-bold ml-1">
                  {element.price.toFixed(2)}
                </span>
              </p>
              <button
                className="flex items-center border border-amber-500 px-2 py-1 rounded-full hover:text-amber-500 transition-all mt-2 text-sm"
                onClick={() => addCart(element)}
              >
                <ShoppingCart size={18} className="mr-1" />
                Adicionar
              </button>

              {/* Ver detalhes */}
              <div
                onClick={() => navigate(`/products/${element.id}`)}
                className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 w-[90%] h-8 bg-amber-500 text-white items-center justify-center rounded-md z-10 
                  opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                  transition-all duration-300 shadow-md cursor-pointer flex text-sm"
              >
                Ver detalhes
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão flutuante */}
      <button
        className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition-all z-40 text-sm sm:text-base"
        onClick={() => setShowModal(true)}
      >
        Ver carrinho ({totalItems})
      </button>
    </>
  );
}
