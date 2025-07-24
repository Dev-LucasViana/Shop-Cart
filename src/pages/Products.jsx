import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, Basket } from '@phosphor-icons/react'

export default function Products(){
    const [ data, setData] = useState([])
    const navigate = useNavigate()
    const [detalhes, setDetalhes] = useState('none')
    
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
            <div className="bg-amber-500 font-roboto flex flex-row items-center justify-center p-3 h-16">
                <div className="flex flex-row justify-evenly items-center w-1/2">
                    <h1 className="text-3xl font-semibold text-white m-auto hover:cursor-pointer">Início</h1>
                    <h2 className="text-2xl font-semibold text-white m-auto hover:cursor-pointer" onClick={() => navigate('/')}>Deslogar</h2>
                    <h2 className="text-2xl font-semibold text-white flex items-center m-auto hover:cursor-pointer" onClick={ () => navigate('/checkout', {  state: { cart }  })}>Carrinho<Basket size={24} /><sup>{ cart.length }</sup></h2>
                </div>
                
            </div>

            <div className="flex flex-row flex-wrap bg-gray-200 transition-all px-36 pb-36">
            {
                data.map((element) => {
                    return (
                        <> 
                                <div className="group relative w-64 m-auto mt-6">
                                
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
                                        <span className="text-xl font-bold ml-1">{element.price}</span>
                                    </p>
                                    <button
                                        className="flex hover:text-amber-500 transition-all"
                                        onClick={() => addCart(element)}
                                    >
                                        <ShoppingCart size={24} />Adicionar ao carrinho
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


                        </>
                    )
                })
            }
            </div>
        </>
    )
}