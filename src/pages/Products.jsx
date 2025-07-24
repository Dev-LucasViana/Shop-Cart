import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Basket } from '@phosphor-icons/react'

export default function Products(){
    const [ data, setData] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => setData(json))
    },[])
    
    const [cart, setCart] = useState([])
    const addCart = (element) => {
        setCart([...cart, element])
    }
    
    console.log(cart);

    return(
        <>
            <div className="bg-slate-600">
                <h1>Produtos</h1>
                <h2 onClick={ () => navigate('/checkout', {  state: { cart }  })}>Carrinho<Basket size={24} /><sup>{ cart.length }</sup></h2>
            </div>

            <div className="">
            {
                data.map((element) => {
                    return (
                        <> 
                            <div className="">
                                <img onClick={() => navigate(`/products/${element.id}`)} src={ element.image } alt="" />
                                <p id="">{ element.title }</p>
                                <div className="">
                                    <p id="">R$ { element.price }</p>
                                    <button id="" onClick={() => addCart(element)}><ShoppingCart size={30} />Adicionar ao carrinho</button>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            </div>
        </>
    )
}