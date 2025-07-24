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
            <div className="">
                <div className="">
                <button id="" onClick={() => navigate(-1)} type="button"><ArrowUUpLeft size={20} />Voltar</button>
                <h1 id="">Detalhes do Produto</h1>
            </div>
            
            <div className="">
                <div className="">
                    <h3>{ product.title }</h3>
                    <img src={ product.image } alt="" />
                </div>
                <div className="">
                    <button>Adicionar ao carrinho</button>
                </div>
            </div>
                        <div className="">
            {
                allProducts.map((element) => {
                    return (
                        <> 
                            <div onClick={() => navigate(`/products/${element.id}`)} className="">
                                <img src={ element.image } alt="" />
                                <p id="">{ element.title }</p>
                                <div className="">
                                    <p id="">R$ { element.price }</p>
                                    <button id=""><ShoppingCart size={30} />Adicionar ao carrinho</button>
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