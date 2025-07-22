import { useEffect,useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowUUpLeft } from '@phosphor-icons/react'

export default function ProductDetails(){

    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    const [product, setProduct] = useState([])
    const [allProducts, setAllProducts] = useState([])
    
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then((response) => response.json())
        .then((json) => setProduct(json))
    },[])

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products`)
        .then((response) => response.json())
        .then((json) => setAllProducts(json))
    },[])

    return(
        <>
            <div className="body-container">
                <div className="header-container">
                <button id="backpage-button" onClick={() => navigate(-1)} type="button"><ArrowUUpLeft size={20} />Voltar</button>
                <h1 id="h1-header">Detalhes do Produto</h1>
            </div>
            
            <div className="product-details">
                <div className="details">
                    <h3>{ product.title }</h3>
                    <img src={ product.image } alt="" />
                </div>
                <div className="buy-details">
                    <button>Adicionar ao carrinho</button>
                </div>
            </div>
                        <div className="other-products">
            {
                allProducts.map((element) => {
                    return (
                        <> 
                            <div onClick={() => navigate(`/products/${element.id}`)} className="product">
                                <img src={ element.image } alt="" />
                                <p id="product-title">{ element.title }</p>
                                <div className="add-cart-container">
                                    <p id="product-price">R$ { element.price }</p>
                                    <button id="add-cart"><ShoppingCart size={30} />Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            </div>
            </div>

        </>
    )
}