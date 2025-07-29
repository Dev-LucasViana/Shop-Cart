import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ArrowFatLinesLeft,
  Basket,
  House,
} from "@phosphor-icons/react";
import starFull from "../assets/star-full.svg";
import starHalf from "../assets/star-half.svg";
import CartModal from "../components/cartModal";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("shopcart_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("shopcart_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar o produto:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((json) => setAllProducts(json));
  }, []);

  if (loading || !product) return <p className="p-4">Carregando produto...</p>;

  const rate = product.rating?.rate ?? 0;
  const count = product.rating?.count ?? 0;
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.25 && rate % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

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

  return (
    <>
      <div>
        <div className="bg-amber-500 font-roboto flex flex-row items-center justify-center p-3 h-16">
          <div className="flex flex-row justify-evenly items-center w-1/2">
            <h2
              onClick={() => navigate("/products")}
              className="flex items-center text-2xl  text-white m-auto hover:cursor-pointer"
            >
              Início <House className="mx-1" size={24} weight="regular" />
            </h2>
            <h2
              className="text-2xl text-white flex items-center m-auto hover:cursor-pointer"
              onClick={() => navigate("/checkout")}
            >
              Carrinho
              <Basket className="ml-1" weight="regular" size={24} />
            </h2>
            <h2
              className="text-2xl text-white m-auto hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              Log-out
            </h2>
          </div>
        </div>

        <div className="font-roboto h-[600px] flex mt-8">
          <div className=" w-1/2 mx-auto flex flex-col items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-[400px] h-[400px] object-contain"
            />
          </div>

          <div className=" w-1/2 mx-auto p-4">
            <h2 className="text-2xl mb-2 font-bold">{product.title}</h2>

            <div className="flex items-center mb-4">
              <u className="text-[#1F2937]">{rate.toFixed(1)}</u>

              <div className="flex items-center gap-1 ml-2">
                {[...Array(fullStars)].map((_, i) => (
                  <img
                    src={starFull}
                    alt="Estrela cheia"
                    key={`full-${i}`}
                    className="w-5 h-5"
                  />
                ))}
                {hasHalfStar && (
                  <img
                    src={starHalf}
                    alt="Meia estrela"
                    key="half"
                    className="w-5 h-5"
                  />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <span key={`empty-${i}`} className="text-gray-300 text-xl">
                    ☆
                  </span>
                ))}
              </div>

              <span className="mx-2">|</span>
              <u className="text-[#1F2937]">{count}</u>
              <span className="ml-1">Avaliações</span>
            </div>

            <p className="mb-4">{product.description}</p>
            <button
              onClick={() => addCart(product)}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 p-6">
          {allProducts.map((element) => (
            <div
              key={element.id}
              onClick={() => navigate(`/products/${element.id}`)}
              className="bg-white border rounded p-4 hover:shadow cursor-pointer"
            >
              <img
                src={element.image}
                alt={element.title}
                className="h-32 mx-auto object-contain"
              />
              <p className="mt-2 font-semibold text-center">{element.title}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-amber-600 font-bold">
                  R$ {element.price.toFixed(2)}
                </p>
                <button
                  className="flex items-center gap-1 text-amber-500 hover:text-amber-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    addCart(element);
                  }}
                >
                  <ShoppingCart size={24} />
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition-all z-40"
          onClick={() => setShowModal(true)}
        >
          Ver carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>

        <CartModal
          cart={cart}
          setCart={setCart}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
}
