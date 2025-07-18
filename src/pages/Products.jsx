import { useEffect, useState } from "react"
import '../styles/ProductsPageStyle.css'
import { useNavigate } from "react-router-dom"

export default function Products(){
    const [ data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => setData(json))
    },[])

    return(
        <>
            <div className="header">
                <h1>Produtos</h1>
            </div>

            <div className="products-container">
            {
                data.map((element) => {
                    return (
                        <> 
                            <div onClick={() => navigate(`/products/${element.id}`)} className="product">
                            <img src={ element.image } alt="" />
                            <p id="product-title">{ element.title }</p>
                            <p>R$ { element.price }</p>
                            </div>
                        </>
                    )
                })
            }
            </div>
        </>
    )
}