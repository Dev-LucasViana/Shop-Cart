import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Basket, House } from "@phosphor-icons/react";
import CartModal from "../components/cartModal";

export default function Products() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Estado do carrinho
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("shopcart_cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Atualiza o localStorage sempre que o carrinho muda
  useEffect(() => {
    localStorage.setItem("shopcart_cart", JSON.stringify(cart));
  }, [cart]);

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Buscar os produtos da API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // Adiciona ou atualiza um item no carrinho
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

  // Total de itens no carrinho
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Modal do carrinho */}
      <CartModal
        cart={cart}
        setCart={setCart}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {/* Cabeçalho */}
      <div className="bg-amber-500 font-roboto flex flex-row items-center justify-center p-3 h-16">
        <div className="flex flex-row justify-evenly items-center w-1/2">
          <h2 className="flex items-center text-2xl  text-white m-auto hover:cursor-pointer">
            Início <House className="mx-1" size={24} weight="bold" />
          </h2>
          <h2
            className="text-2xl text-white flex items-center m-auto hover:cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            Carrinho
            <Basket className="ml-1" size={24} />
          </h2>
          <h2
            className="text-2xl text-white m-auto hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log-out
          </h2>
        </div>
      </div>

      {/* Lista de produtos */}
      <div className="flex flex-row flex-wrap bg-gray-200 transition-all px-36 pb-36">
        {data.map((element) => (
          <div key={element.id} className="group relative w-64 m-auto mt-6">
            <div className="h-96 rounded-md p-3 bg-white flex flex-col justify-end hover:cursor-pointer transition-all z-0">
              <img
                className="w-[200px] h-[200px] object-cover my-auto"
                onClick={() => navigate(`/products/${element.id}`)}
                src={element.image}
                alt=""
              />
              <p>{element.title}</p>
              <div className="flex flex-col items-start justify-end mb-0">
                <p className="flex items-center justify-center text-amber-500">
                  R$
                  <span className="text-xl font-bold ml-1">
                    {element.price}
                  </span>
                </p>
                <button
                  className="flex border-amber-500 border-solid border-2 p-1 rounded-full hover:text-amber-500 transition-all"
                  onClick={() => addCart(element)}
                >
                  <ShoppingCart size={24} />
                  Adicionar ao carrinho
                </button>
              </div>
            </div>

            <div
              onClick={() => navigate(`/products/${element.id}`)}
              className="absolute bottom-[-2.5rem] left-0 w-64 h-10 bg-amber-500 text-white items-center justify-center rounded-md z-10 
                opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                transition-all duration-300 shadow-lg cursor-pointer flex"
            >
              <h3>Ver detalhes</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Botão flutuante para abrir modal */}
      <button
        className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition-all z-40"
        onClick={() => setShowModal(true)}
      >
        Ver carrinho ({totalItems})
      </button>
    </>
  );
}
