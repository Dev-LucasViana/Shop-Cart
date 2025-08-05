import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Basket, House, SignOut } from "@phosphor-icons/react";
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
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => setAllProducts(json));
  }, []);

  const rate = product?.rating?.rate ?? 0;
  const count = product?.rating?.count ?? 0;
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

  if (loading || !product) return <p className="p-4">Carregando produto...</p>;

  return (
    <>
      <CartModal
        cart={cart}
        setCart={setCart}
        showModal={showModal}
        setShowModal={setShowModal}
      />

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

      <div className="bg-gray-200 pt-10">
        <div className="bg-white font-roboto px-4 py-8 flex flex-col lg:flex-row gap-8 max-w-screen-xl mx-auto">
          <div className="flex justify-center lg:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] object-contain"
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {product.title}
            </h2>

            <div className="flex items-center mb-4">
              <u className="text-gray-800">{rate.toFixed(1)}</u>
              <div className="flex items-center gap-1 ml-2">
                {[...Array(fullStars)].map((_, i) => (
                  <img
                    src={starFull}
                    alt="★"
                    key={`full-${i}`}
                    className="w-5 h-5"
                  />
                ))}
                {hasHalfStar && (
                  <img src={starHalf} alt="½" key="half" className="w-5 h-5" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <span key={`empty-${i}`} className="text-gray-300 text-xl">
                    ☆
                  </span>
                ))}
              </div>
              <span className="mx-2">|</span>
              <u className="text-gray-800">{count}</u>
              <span className="ml-1">Avaliações</span>
            </div>

            <p className="mb-4 text-sm sm:text-base">{product.description}</p>

            <p className="text-amber-600 text-xl font-bold mb-4">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <button
              onClick={() => addCart(product)}
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Mais Produtos
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-4 gap-y-12 max-w-screen-xl mx-auto">
          {allProducts.map((element) => (
            <div
              key={element.id}
              onClick={() => navigate(`/products/${element.id}`)}
              className="bg-white border rounded-md p-3 flex flex-col items-center justify-between h-[280px] cursor-pointer hover:shadow transition-all relative group"
            >
              <img
                src={element.image}
                alt={element.title}
                className="w-[100px] h-[100px] object-contain"
              />
              <p className="text-xs mt-2 line-clamp-2 text-center">
                {element.title}
              </p>
              <p className="text-sm text-amber-600 font-bold mt-1">
                {element.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <button
                className="flex items-center border border-amber-500 px-2 py-1 rounded-full hover:text-amber-500 transition-all mt-2 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  addCart(element);
                }}
              >
                <ShoppingCart size={18} />
                Adicionar
              </button>

              <div
                onClick={() => navigate(`/products/${element.id}`)}
                className="absolute bottom-[-2.2rem] left-0 w-full h-8 bg-amber-500 text-white items-center justify-center rounded-md z-10 
                  opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                  transition-all duration-300 shadow-md cursor-pointer flex text-sm"
              >
                Ver detalhes
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-amber-600 transition-all z-40 text-sm sm:text-base"
        onClick={() => setShowModal(true)}
      >
        Ver carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </button>
    </>
  );
}
