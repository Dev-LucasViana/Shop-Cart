import { useEffect, useState } from "react"
import '../styles/ProductsPageStyle.css'

export default function Products(){
    const [ data, setData] = useState([])


    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => setData(json))
    },[])

    return(
        <>
            <header>
                <h1>Produtos</h1>
            </header>

            <div className="products-container">
            {
                data.map((element) => {
                    return (
                        <> 
                            <div className="product">
                            <img src={ element.image } width="250px" height="250px" alt="" />
                            <p>{ element.title }</p>
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